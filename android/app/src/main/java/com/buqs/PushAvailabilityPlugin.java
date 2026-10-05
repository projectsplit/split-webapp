package com.buqs;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

/**
 * Tells the web layer whether this build can use push notifications at all.
 *
 * Firebase is configured by google-services.json, which is not in the repository. A build made
 * without it compiles and runs, but has no FirebaseApp, and the push plugin does not check: its
 * register and unregister go straight to FirebaseMessaging.getInstance(), which throws on the
 * plugin thread and takes the whole app down. Nothing in JavaScript can catch that, so the web layer
 * asks here first and stays away from the plugin when the answer is no.
 */
@CapacitorPlugin(name = "PushAvailability")
public class PushAvailabilityPlugin extends Plugin {

    @PluginMethod
    public void isAvailable(PluginCall call) {
        JSObject result = new JSObject();
        result.put("available", isFirebaseConfigured());
        call.resolve(result);
    }

    /**
     * The google-services Gradle plugin turns the JSON file into string resources, and
     * google_app_id is the one Firebase itself looks for when deciding whether it can start. Asking
     * for the same resource gives the same answer, without this module needing Firebase's classes.
     */
    private boolean isFirebaseConfigured() {
        return getContext().getResources().getIdentifier("google_app_id", "string", getContext().getPackageName()) != 0;
    }
}
