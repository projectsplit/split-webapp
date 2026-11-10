package com.buqs;

import android.content.Context;
import android.util.AtomicFile;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

/**
 * What the payment listener has collected, and the choices that steer it, kept on this phone only.
 *
 * Everything lives in one small JSON file in the no-backup folder. The manifest allows Android's
 * automatic backup, which copies the app's ordinary files to the person's Google Drive; the text of
 * their bank's notifications has no business there, and neither does the list of banks they use.
 *
 * The listener calls in here for every notification on the phone, so the file is read once and kept
 * in memory, and written only when something changes. The listener and the plugin run in the same
 * process, so a lock on this class is all the coordination they need.
 */
final class PaymentCaptureStore {

    interface Listener {
        void onCaptured();
    }

    private static final String FILE_NAME = "payment-capture.json";

    /** Bounds the file for someone who switches this on and then never opens the app to review. */
    private static final int MAX_CAPTURES = 200;
    private static final long MAX_AGE_MS = 60L * 24 * 60 * 60 * 1000;

    /**
     * A notification updated in place with the same text is the same payment, not another one. Apps
     * do that within moments. A bank that posts every payment under one notification can post the
     * same text again minutes later for a second, identical payment, which is a second coffee.
     */
    private static final long REPOST_WINDOW_MS = 60 * 1000;

    /** How stale a seen app's entry may get before another sighting is worth a write. */
    private static final long SEEN_WRITE_INTERVAL_MS = 60 * 60 * 1000;

    private static JSONObject state;
    private static Set<String> sources;
    private static volatile Listener listener;

    private PaymentCaptureStore() {}

    static void setListener(Listener value) {
        listener = value;
    }

    static synchronized boolean isEnabled(Context context) {
        return load(context).optBoolean("enabled", false);
    }

    static synchronized void setEnabled(Context context, boolean enabled) {
        put(load(context), "enabled", enabled);
        save(context);
    }

    static synchronized boolean isSource(Context context, String packageName) {
        load(context);
        return sources.contains(packageName);
    }

    static synchronized List<String> sources(Context context) {
        load(context);
        return new ArrayList<>(sources);
    }

    static synchronized void setSources(Context context, Collection<String> packageNames) {
        sources = new HashSet<>(packageNames);
        put(load(context), "sources", new JSONArray(sources));
        save(context);
    }

    static synchronized long lastCapturedAt(Context context) {
        return load(context).optLong("lastCapturedAt", 0);
    }

    /** Keeps a capture unless it is one already kept. True when it was new. */
    static boolean add(Context context, JSONObject capture) {
        synchronized (PaymentCaptureStore.class) {
            JSONArray captures = captures(load(context));

            for (int i = 0; i < captures.length(); i++) {
                JSONObject existing = captures.optJSONObject(i);
                if (existing != null && isSameCapture(existing, capture)) return false;
            }

            captures.put(capture);
            put(state, "captures", prune(captures));
            put(state, "lastCapturedAt", System.currentTimeMillis());
            save(context);
        }

        // Outside the lock: the plugin hands this to the web layer, which calls straight back in.
        Listener current = listener;
        if (current != null) current.onCaptured();

        return true;
    }

    /**
     * A copy, so the caller can hand it on while the listener keeps adding. What is too old to keep
     * goes as it is read as well as when the next payment arrives, so that a phone whose payment apps
     * go quiet does not hold on to it past the 60 days the privacy policy promises.
     */
    static synchronized JSONArray captures(Context context) {
        JSONArray all = captures(load(context));
        JSONArray kept = prune(all);

        if (kept.length() != all.length()) {
            put(state, "captures", kept);
            save(context);
        }

        return copy(kept);
    }

    static synchronized void remove(Context context, Set<String> ids) {
        JSONArray captures = captures(load(context));
        JSONArray kept = new JSONArray();

        for (int i = 0; i < captures.length(); i++) {
            JSONObject capture = captures.optJSONObject(i);
            if (capture != null && !ids.contains(capture.optString("id"))) kept.put(capture);
        }

        put(state, "captures", kept);
        save(context);
    }

    /**
     * Notes an app that posted something that looks like a payment. Only its name is kept here, never
     * what it said. A sighting that may be one already counted (the listener looking through the
     * shade again after reconnecting) lists an app it has not seen before but adds nothing to one it
     * has.
     */
    static synchronized void recordSeen(Context context, String packageName, String appName, boolean count) {
        JSONObject seen = load(context).optJSONObject("seen");
        if (seen == null) {
            seen = new JSONObject();
            put(state, "seen", seen);
        }

        long now = System.currentTimeMillis();
        JSONObject entry = seen.optJSONObject(packageName);
        boolean isNew = entry == null;

        if (!isNew && !count) return;
        if (isNew) entry = new JSONObject();

        long lastSeenAt = entry.optLong("lastSeenAt", 0);

        put(entry, "appName", appName);
        put(entry, "count", entry.optInt("count", 0) + 1);
        put(entry, "lastSeenAt", now);
        put(seen, packageName, entry);

        // An app that mentions money in every notification would otherwise mean a write each time.
        if (isNew || now - lastSeenAt > SEEN_WRITE_INTERVAL_MS) save(context);
    }

    static synchronized JSONArray seen(Context context) {
        JSONObject seen = load(context).optJSONObject("seen");
        JSONArray result = new JSONArray();
        if (seen == null) return result;

        Iterator<String> packageNames = seen.keys();
        while (packageNames.hasNext()) {
            String packageName = packageNames.next();
            JSONObject entry = seen.optJSONObject(packageName);
            // An app skipped since it was listed, by an earlier version, leaves the list as well.
            if (entry == null || PaymentNotificationListener.SKIPPED_APPS.contains(packageName)) continue;

            JSONObject item = copy(entry);
            put(item, "packageName", packageName);
            result.put(item);
        }

        return result;
    }

    /**
     * Forgets everything, the switch included. Signing out leaves nothing behind on the device, and
     * whoever signs in next decides for themselves whether their notifications are read.
     */
    static synchronized void clear(Context context) {
        state = new JSONObject();
        sources = Collections.emptySet();
        save(context);
    }

    private static boolean isSameCapture(JSONObject a, JSONObject b) {
        if (a.optString("id").equals(b.optString("id"))) return true;

        return a.optString("key").equals(b.optString("key"))
            && a.optString("title").equals(b.optString("title"))
            && a.optString("text").equals(b.optString("text"))
            && Math.abs(a.optLong("postedAt") - b.optLong("postedAt")) < REPOST_WINDOW_MS;
    }

    /** Drops what is too old to be worth reviewing, then the oldest beyond the cap. */
    private static JSONArray prune(JSONArray captures) {
        long cutoff = System.currentTimeMillis() - MAX_AGE_MS;
        List<JSONObject> kept = new ArrayList<>();

        for (int i = 0; i < captures.length(); i++) {
            JSONObject capture = captures.optJSONObject(i);
            if (capture != null && capture.optLong("postedAt") >= cutoff) kept.add(capture);
        }

        Collections.sort(kept, (a, b) -> Long.compare(a.optLong("postedAt"), b.optLong("postedAt")));

        int from = Math.max(0, kept.size() - MAX_CAPTURES);
        return new JSONArray(kept.subList(from, kept.size()));
    }

    private static JSONArray captures(JSONObject from) {
        JSONArray captures = from.optJSONArray("captures");
        if (captures == null) {
            captures = new JSONArray();
            put(from, "captures", captures);
        }
        return captures;
    }

    private static JSONObject load(Context context) {
        if (state != null) return state;

        try {
            byte[] bytes = new AtomicFile(file(context)).readFully();
            state = new JSONObject(new String(bytes, StandardCharsets.UTF_8));
        } catch (IOException | JSONException e) {
            // Missing until the first write. AtomicFile keeps a write that was cut short from leaving
            // a half-written file behind, so starting afresh is the right answer either way.
            state = new JSONObject();
        }

        sources = new HashSet<>();
        JSONArray stored = state.optJSONArray("sources");
        if (stored != null) {
            for (int i = 0; i < stored.length(); i++) sources.add(stored.optString(i));
        }

        return state;
    }

    private static void save(Context context) {
        AtomicFile file = new AtomicFile(file(context));
        FileOutputStream out = null;

        try {
            out = file.startWrite();
            out.write(state.toString().getBytes(StandardCharsets.UTF_8));
            file.finishWrite(out);
        } catch (IOException e) {
            if (out != null) file.failWrite(out);
        }
    }

    private static File file(Context context) {
        return new File(context.getNoBackupFilesDir(), FILE_NAME);
    }

    private static JSONObject copy(JSONObject object) {
        try {
            return new JSONObject(object.toString());
        } catch (JSONException e) {
            return new JSONObject();
        }
    }

    private static JSONArray copy(JSONArray array) {
        try {
            return new JSONArray(array.toString());
        } catch (JSONException e) {
            return new JSONArray();
        }
    }

    /** JSONObject.put only throws for a null key or a non-finite number, neither of which occurs here. */
    private static void put(JSONObject object, String key, Object value) {
        try {
            object.put(key, value);
        } catch (JSONException e) {
            throw new IllegalStateException(e);
        }
    }
}
