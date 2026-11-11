package com.buqs;

import android.app.Notification;
import android.content.ComponentName;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.service.notification.NotificationListenerService;
import android.service.notification.StatusBarNotification;

import androidx.core.os.BundleCompat;

import org.json.JSONException;
import org.json.JSONObject;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;
import java.util.regex.Pattern;

/**
 * Collects the notifications payment apps post when the person pays, for Buqs to offer as expenses
 * the next time it is opened.
 *
 * Android hands a notification listener the notifications of every app on the phone; the manifest
 * already declines conversations, so chats never arrive. Mail, news, browser and text message apps
 * are passed over without a look, and so are mail, adverts and suggestions from any app: they
 * mention money all day long and never report a payment. Of the rest, only notifications that
 * mention an amount are looked at further, and only those from the apps the person picked are kept:
 * a bank's statement reminders are no use as expenses. Of any other app nothing is kept but its
 * name, when what it posted looks like a payment, so that settings can offer it — which is how
 * someone whose bank Buqs has never heard of finds it there.
 *
 * Runs without the web layer. The system binds it whenever notification access is on, whether or not
 * the app is open, so it writes to {@link PaymentCaptureStore} and the plugin reads from there.
 */
public class PaymentNotificationListener extends NotificationListenerService {

    private static final String SPACE = "[\\s\\u00a0\\u202f]?";

    /**
     * Every currency code the web layer knows (openExchangeRates.ts), so that nothing it could read is
     * thrown away here first.
     */
    private static final String CODES =
        "USD|EUR|GBP|CHF|INR|CNY|JPY|AED|AFN|ALL|AMD|AOA|ARS|AUD|AWG|AZN|BAM|BBD|BDT|BGN|BHD|BIF|BMD"
            + "|BND|BOB|BRL|BSD|BTN|BWP|BYN|BZD|CAD|CDF|CLF|CLP|COP|CRC|CUC|CUP|CVE|CZK|DJF|DKK|DOP"
            + "|DZD|EGP|ERN|ETB|FJD|FKP|GEL|GHS|GIP|GMD|GNF|GTQ|GYD|HKD|HNL|HRK|HTG|HUF|IDR|ILS|IQD"
            + "|IRR|ISK|JMD|JOD|KES|KGS|KHR|KMF|KPW|KRW|KWD|KYD|KZT|LAK|LBP|LKR|LRD|LSL|LYD|MAD|MDL"
            + "|MGA|MKD|MMK|MNT|MOP|MRU|MUR|MVR|MWK|MXN|MYR|MZN|NAD|NGN|NIO|NOK|NPR|NZD|OMR|PAB|PEN"
            + "|PGK|PHP|PKR|PLN|PYG|QAR|RON|RSD|RUB|RWF|SAR|SBD|SCR|SDG|SEK|SGD|SHP|SLL|SOS|SRD|SSP"
            + "|STN|SVC|SYP|SZL|THB|TJS|TMT|TND|TOP|TRY|TTD|TWD|TZS|UAH|UGX|UYU|UZS|VES|VND|VUV|WST"
            + "|YER|ZAR|ZMW";

    // The symbols the web layer reads as well: NZ$, R$ and the like end in a $ already. The lev is
    // fenced by a lookbehind, since \b only knows ASCII letters on some Java runtimes.
    private static final String CURRENCY =
        "(?:[€£$¥₹₺₽₩₪₫฿₱₦₴]"
            + "|\\b(?:" + CODES + ")\\b"
            + "|\\bkr\\b|zł|Kč|\\blei\\b|\\bFt\\b|(?<!\\p{L})лв|\\bFr\\.)";

    /**
     * A currency beside a number: €12.50, 12,50 €, EUR 12.50, 120 kr. Deliberately loose. What is
     * kept is read properly in the web layer, and this only decides what is worth keeping.
     */
    private static final Pattern AMOUNT =
        Pattern.compile(CURRENCY + SPACE + "[-−]?" + SPACE + "\\d|\\d" + SPACE + CURRENCY);

    private static final char[] HEX = "0123456789abcdef".toCharArray();

    /**
     * Apps whose notifications are never a payment, however often they mention money: mail, the
     * Google app's news and stock alerts, news apps, offers websites push through a browser, video
     * titles, and texts from apps that don't post them as conversations. Settings never lists them.
     */
    static final Set<String> SKIPPED_APPS = new HashSet<>(Arrays.asList(
        // Mail
        "com.google.android.gm",
        "com.google.android.gm.lite",
        "com.microsoft.office.outlook",
        "com.yahoo.mobile.client.android.mail",
        "com.samsung.android.email.provider",
        "com.android.email",
        "com.huawei.email",
        "ch.protonmail.android",
        "com.readdle.spark",
        "me.bluemail.mail",
        "org.kman.AquaMail",
        "com.fsck.k9",
        "net.thunderbird.android",
        "com.easilydo.mail",
        "com.fastmail.app",
        "de.tutao.tutanota",
        "de.gmx.mobile.android.mail",
        "de.web.mobile.android.mail",
        "com.aol.mobile.aolapp",
        "com.zoho.mail",
        // News
        "com.google.android.googlequicksearchbox",
        "com.google.android.apps.searchlite",
        "com.google.android.apps.magazines",
        "com.microsoft.amp.apps.bingnews",
        "flipboard.app",
        "bbc.mobile.news.uk",
        "bbc.mobile.news.ww",
        "com.guardian",
        "com.bskyb.skynews.android",
        "com.ft.news",
        "com.nytimes.android",
        "com.cnn.mobile.android.phone",
        "com.thomsonreuters.reuters",
        "com.bloomberg.android.plus",
        "jp.gocro.smartnews.android",
        "com.particlenews.newsbreak",
        // Browsers and video
        "com.android.chrome",
        "org.mozilla.firefox",
        "com.sec.android.app.sbrowser",
        "com.microsoft.emmx",
        "com.opera.browser",
        "com.brave.browser",
        "com.duckduckgo.mobile.android",
        "com.google.android.youtube",
        // Texts
        "com.google.android.apps.messaging",
        "com.samsung.android.messaging",
        "com.android.messaging",
        "com.android.mms"));

    /**
     * The kinds of notification an app can say it is posting that are never a payment: new mail,
     * adverts and suggested reading. A payment app's own offers ("£5 back at...") are adverts too.
     */
    private static final Set<String> SKIPPED_CATEGORIES = new HashSet<>(Arrays.asList(
        Notification.CATEGORY_EMAIL, Notification.CATEGORY_PROMO, Notification.CATEGORY_RECOMMENDATION));

    /**
     * Whether the system has this listener bound right now, which the plugin checks to catch one that
     * access is on for but that was never bound again. Only meaningful within this process, which is
     * the only place it is read.
     */
    static volatile boolean connected;

    @Override
    public void onListenerConnected() {
        connected = true;

        // Anything posted while the listener was not bound is still in the shade, unless the person
        // has swiped it away. Seeing one again is harmless: a capture's id comes from its content.
        try {
            StatusBarNotification[] active = getActiveNotifications();
            if (active == null) return;

            for (StatusBarNotification notification : active) handle(notification, true);
        } catch (RuntimeException e) {
            // Access withdrawn between the connection and this call.
        }
    }

    @Override
    public void onListenerDisconnected() {
        connected = false;

        // The system drops a listener on its own for reasons of its own, among them app updates on
        // some phones. Asking to come back is the one call allowed at this point.
        requestRebind(new ComponentName(this, PaymentNotificationListener.class));
    }

    @Override
    public void onNotificationPosted(StatusBarNotification notification) {
        handle(notification, false);
    }

    /** Rescanning is a second look at what is in the shade, which may already have been counted. */
    private void handle(StatusBarNotification posted, boolean rescanning) {
        if (!PaymentCaptureStore.isEnabled(this)) return;

        String packageName = posted.getPackageName();
        if (getPackageName().equals(packageName) || SKIPPED_APPS.contains(packageName)) return;

        Notification notification = posted.getNotification();

        // A group's summary repeats the notifications under it, and an ongoing notification is a call
        // or a download in progress, never a payment that has happened.
        if ((notification.flags & Notification.FLAG_GROUP_SUMMARY) != 0 || posted.isOngoing()) return;
        if (SKIPPED_CATEGORIES.contains(notification.category)) return;

        Bundle extras = notification.extras;
        if (extras == null) return;

        String title = firstText(extras, Notification.EXTRA_TITLE_BIG, Notification.EXTRA_TITLE);
        String text = bodyOf(extras);

        if (!AMOUNT.matcher(title + "\n" + text).find()) return;

        String appName = appNameOf(posted);

        // Every app that posts a payment is listed in settings, read or not, so the person sees what
        // there is to choose from without Buqs needing to know their bank in advance.
        PaymentCaptureStore.recordSeen(this, packageName, appName, !rescanning);

        if (!PaymentCaptureStore.isSource(this, packageName)) return;

        String key = posted.getKey();
        long postedAt = posted.getPostTime();

        try {
            JSONObject capture = new JSONObject();
            capture.put("id", idFor(packageName, key, postedAt, title, text));
            capture.put("packageName", packageName);
            capture.put("appName", appName);
            capture.put("title", title);
            capture.put("text", text);
            capture.put("postedAt", postedAt);
            capture.put("key", key);

            PaymentCaptureStore.add(this, capture);
        } catch (JSONException e) {
            // Only thrown for a null key or a non-finite number, and there are neither.
        }
    }

    /**
     * The full text where the app gave one. EXTRA_TEXT is what fits on a single line, and a bank that
     * names the merchant after the amount can lose it there; an inbox-style notification keeps its
     * lines apart from either.
     */
    private static String bodyOf(Bundle extras) {
        StringBuilder body = new StringBuilder(firstText(extras, Notification.EXTRA_BIG_TEXT, Notification.EXTRA_TEXT));

        CharSequence[] lines = extras.getCharSequenceArray(Notification.EXTRA_TEXT_LINES);
        if (lines != null) {
            for (CharSequence line : lines) {
                if (line == null || line.length() == 0) continue;
                if (body.length() > 0) body.append('\n');
                body.append(line);
            }
        }

        return body.toString().trim();
    }

    private static String firstText(Bundle extras, String... keys) {
        for (String key : keys) {
            CharSequence value = extras.getCharSequence(key);
            if (value != null && value.length() > 0) return value.toString().trim();
        }
        return "";
    }

    /**
     * Package visibility keeps this app from looking up most others by name. Every notification built
     * the usual way carries its sender's ApplicationInfo, though, and that is enough to load the label.
     */
    private String appNameOf(StatusBarNotification posted) {
        PackageManager packageManager = getPackageManager();
        Bundle extras = posted.getNotification().extras;

        ApplicationInfo info = extras == null ? null : BundleCompat.getParcelable(extras, "android.appInfo", ApplicationInfo.class);

        try {
            if (info == null) info = packageManager.getApplicationInfo(posted.getPackageName(), 0);
            return packageManager.getApplicationLabel(info).toString();
        } catch (PackageManager.NameNotFoundException | RuntimeException e) {
            return posted.getPackageName();
        }
    }

    /**
     * A name-based UUID of the notification's content, so the same notification always gets the same
     * id. Seeing it twice then keeps it once, and since the web layer files the expense under this id,
     * sending that expense twice still stores it once.
     */
    private static String idFor(String packageName, String key, long postedAt, String title, String text) {
        byte[] hash;

        try {
            String content = packageName + '\n' + key + '\n' + postedAt + '\n' + title + '\n' + text;
            hash = MessageDigest.getInstance("SHA-1").digest(content.getBytes(StandardCharsets.UTF_8));
        } catch (NoSuchAlgorithmException e) {
            return UUID.randomUUID().toString();
        }

        // Version 5 and the RFC 4122 variant, so it is a well-formed UUID wherever it is checked.
        hash[6] = (byte) ((hash[6] & 0x0f) | 0x50);
        hash[8] = (byte) ((hash[8] & 0x3f) | 0x80);

        StringBuilder id = new StringBuilder(36);
        for (int i = 0; i < 16; i++) {
            if (i == 4 || i == 6 || i == 8 || i == 10) id.append('-');
            id.append(HEX[(hash[i] >> 4) & 0x0f]).append(HEX[hash[i] & 0x0f]);
        }

        return id.toString();
    }
}
