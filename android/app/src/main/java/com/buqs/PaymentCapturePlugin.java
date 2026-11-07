package com.buqs;

import android.content.ActivityNotFoundException;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Handler;
import android.os.Looper;
import android.provider.Settings;
import android.service.notification.NotificationListenerService;

import androidx.core.app.NotificationManagerCompat;

import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import org.json.JSONException;

import java.util.HashSet;
import java.util.List;

/**
 * The web layer's side of payments from notifications: whether Android has given Buqs notification
 * access, which apps the person wants read, and the payments collected while the app was closed.
 *
 * The collecting itself is {@link PaymentNotificationListener}'s, and what it keeps is in
 * {@link PaymentCaptureStore}. Nothing here leaves the phone; the web layer files whatever the person
 * keeps as ordinary expenses.
 */
@CapacitorPlugin(name = "PaymentCapture")
public class PaymentCapturePlugin extends Plugin {

    /**
     * How long after the app starts a listener that access is on for should have been bound. When the
     * process starts for the app rather than for the listener, the system binds the listener soon
     * after; this is well past that.
     */
    private static final long RECONNECT_CHECK_MS = 5000;

    @Override
    public void load() {
        PaymentCaptureStore.setListener(() -> notifyListeners("captured", new JSObject()));

        new Handler(Looper.getMainLooper()).postDelayed(this::reconnectIfDropped, RECONNECT_CHECK_MS);
    }

    @Override
    protected void handleOnDestroy() {
        PaymentCaptureStore.setListener(null);
    }

    @PluginMethod
    public void getStatus(PluginCall call) {
        Context context = getContext();

        JSObject result = new JSObject();
        result.put("access", hasAccess());
        result.put("enabled", PaymentCaptureStore.isEnabled(context));
        result.put("connected", PaymentNotificationListener.connected);
        result.put("lastCapturedAt", PaymentCaptureStore.lastCapturedAt(context));
        call.resolve(result);
    }

    @PluginMethod
    public void setEnabled(PluginCall call) {
        Boolean enabled = call.getBoolean("enabled");
        if (enabled == null) {
            call.reject("enabled is required");
            return;
        }

        PaymentCaptureStore.setEnabled(getContext(), enabled);
        call.resolve();
    }

    /**
     * Opens Buqs's page in the system's notification access settings. Only the person can turn access
     * on, and only there.
     */
    @PluginMethod
    public void openAccessSettings(PluginCall call) {
        Intent intent;

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            // Straight to the switch for this listener, rather than the list of every app that can
            // read notifications.
            intent = new Intent(Settings.ACTION_NOTIFICATION_LISTENER_DETAIL_SETTINGS);
            intent.putExtra(Settings.EXTRA_NOTIFICATION_LISTENER_COMPONENT_NAME, component().flattenToString());
        } else {
            intent = new Intent(Settings.ACTION_NOTIFICATION_LISTENER_SETTINGS);
        }

        try {
            getActivity().startActivity(intent);
        } catch (ActivityNotFoundException e) {
            // Some phones leave out the per-app page; the list is always there.
            try {
                getActivity().startActivity(new Intent(Settings.ACTION_NOTIFICATION_LISTENER_SETTINGS));
            } catch (ActivityNotFoundException ignored) {
                call.reject("Notification access settings are not available on this phone");
                return;
            }
        }

        call.resolve();
    }

    @PluginMethod
    public void getSources(PluginCall call) {
        Context context = getContext();

        JSObject result = new JSObject();
        result.put("packages", new JSArray(PaymentCaptureStore.sources(context)));
        result.put("seen", PaymentCaptureStore.seen(context));
        call.resolve(result);
    }

    @PluginMethod
    public void setSources(PluginCall call) {
        List<String> packages = stringList(call, "packages");
        if (packages == null) return;

        PaymentCaptureStore.setSources(getContext(), packages);
        call.resolve();
    }

    @PluginMethod
    public void getCaptures(PluginCall call) {
        JSObject result = new JSObject();
        result.put("captures", PaymentCaptureStore.captures(getContext()));
        call.resolve(result);
    }

    @PluginMethod
    public void removeCaptures(PluginCall call) {
        List<String> ids = stringList(call, "ids");
        if (ids == null) return;

        PaymentCaptureStore.remove(getContext(), new HashSet<>(ids));
        call.resolve();
    }

    /** Signing out: what was collected, the apps chosen and the switch itself all go. */
    @PluginMethod
    public void clear(PluginCall call) {
        PaymentCaptureStore.clear(getContext());
        call.resolve();
    }

    /**
     * Access is on, the person wants payments collected, and yet the system has not bound the
     * listener — seen on some phones after the app is updated, and it stays that way until something
     * makes the system look again. requestRebind only undoes the listener's own requestUnbind, so the
     * component is turned off and on, which the system does notice.
     */
    private void reconnectIfDropped() {
        Context context = getContext();

        if (!hasAccess() || !PaymentCaptureStore.isEnabled(context) || PaymentNotificationListener.connected) {
            return;
        }

        PackageManager packageManager = context.getPackageManager();
        ComponentName component = component();

        packageManager.setComponentEnabledSetting(
            component, PackageManager.COMPONENT_ENABLED_STATE_DISABLED, PackageManager.DONT_KILL_APP);
        packageManager.setComponentEnabledSetting(
            component, PackageManager.COMPONENT_ENABLED_STATE_ENABLED, PackageManager.DONT_KILL_APP);

        NotificationListenerService.requestRebind(component);
    }

    private boolean hasAccess() {
        Context context = getContext();
        return NotificationManagerCompat.getEnabledListenerPackages(context).contains(context.getPackageName());
    }

    private ComponentName component() {
        return new ComponentName(getContext(), PaymentNotificationListener.class);
    }

    private static List<String> stringList(PluginCall call, String key) {
        JSArray array = call.getArray(key);
        if (array == null) {
            call.reject(key + " is required");
            return null;
        }

        try {
            return array.toList();
        } catch (JSONException e) {
            call.reject(key + " must be a list of strings");
            return null;
        }
    }
}
