package com.buqs;

import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.view.View;

import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginHandle;

import ee.forgr.capacitor.social.login.GoogleProvider;
import ee.forgr.capacitor.social.login.ModifiedMainActivityForSocialLoginPlugin;
import ee.forgr.capacitor.social.login.SocialLoginPlugin;

/**
 * Keeps the web layer out from under the system bars.
 *
 * Android 15 onwards enforces edge-to-edge for anything targeting SDK 35+, and the old
 * setDecorFitsSystemWindows opt-out is ignored, so the WebView is handed the entire screen — status
 * bar and gesture pill included.
 *
 * Capacitor 8's core SystemBars plugin also handles this, but not in a way that suits this app. On a
 * current WebView with viewport-fit=cover it passes the insets straight through and leaves
 * env(safe-area-inset-*) to the CSS — and only a handful of the web app's components use env(). Some
 * two dozen full-screen surfaces are `position: fixed; top: 0` without it, including the shared
 * fullScreenSurface every form is built on, and a fixed element escapes any padding an ancestor
 * holds. Teaching each of them separately would miss some and regress with every new one. Insetting
 * the WebView here is one rule that covers all of them.
 *
 * The division of labour with SystemBars is therefore deliberate. This listener sits above SystemBars'
 * in the view tree, so it pads for the bars and hands down zeroed bar insets; SystemBars then sees
 * nothing to pass through, but still pads its own view by the keyboard height. That keyboard padding
 * is what keeps a form above the keyboard, and it is why windowSoftInputMode is adjustNothing — the
 * legacy resize would count the keyboard a second time.
 *
 * It also hands Google's consent screen back to the sign-in plugin; see onActivityResult.
 */
public class MainActivity extends BridgeActivity implements ModifiedMainActivityForSocialLoginPlugin {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        View content = findViewById(android.R.id.content);

        // The strip left behind beside the bars shows the window background, which is still the
        // splash drawable at this point. The app is black throughout, so this stops the splash
        // artwork peeking out around the edges once the web layer has loaded.
        content.setBackgroundColor(Color.BLACK);

        ViewCompat.setOnApplyWindowInsetsListener(content, (view, windowInsets) -> {
            Insets bars = windowInsets.getInsets(
                WindowInsetsCompat.Type.systemBars() | WindowInsetsCompat.Type.displayCutout());

            // SystemBars pads by the keyboard height while the keyboard is up, and that height is measured
            // from the bottom of the screen, so it already spans the gesture bar. Padding for the bar as
            // well left a bar-high strip of dead black between a form and the keyboard.
            boolean keyboardVisible = windowInsets.isVisible(WindowInsetsCompat.Type.ime());

            view.setPadding(bars.left, bars.top, bars.right, keyboardVisible ? 0 : bars.bottom);

            // Zeroed for children rather than consumed outright, so that Chromium reports
            // env(safe-area-inset-*) as 0 and the CSS written for the web build does not indent the
            // app a second time on top of the padding above.
            //
            // The IME inset is deliberately left alone: the keyboard is Capacitor's to handle, and
            // swallowing it here would stop the layout resizing when the keyboard opens.
            return new WindowInsetsCompat.Builder(windowInsets)
                .setInsets(WindowInsetsCompat.Type.systemBars(), Insets.NONE)
                .setInsets(WindowInsetsCompat.Type.displayCutout(), Insets.NONE)
                .build();
        });
    }

    /**
     * After Google returns an identity, the sign-in plugin asks for the matching access token. When
     * Google wants the person to approve that first, the plugin opens Google's screen from this
     * activity, so the answer comes back here and nowhere else. Without passing it on, the plugin
     * waits for an answer that never arrives and the sign-in button simply never finishes.
     */
    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if (requestCode < GoogleProvider.REQUEST_AUTHORIZE_GOOGLE_MIN || requestCode >= GoogleProvider.REQUEST_AUTHORIZE_GOOGLE_MAX) {
            return;
        }

        PluginHandle handle = getBridge().getPlugin("SocialLogin");
        Plugin plugin = handle == null ? null : handle.getInstance();

        if (plugin instanceof SocialLoginPlugin) {
            ((SocialLoginPlugin) plugin).handleGoogleLoginIntent(requestCode, data);
        }
    }

    /**
     * Never called. The plugin only checks that the activity declares it, as its way of confirming
     * the forwarding above is in place before it will use that path.
     */
    @Override
    public void IHaveModifiedTheMainActivityForTheUseWithSocialLoginPlugin() {}
}
