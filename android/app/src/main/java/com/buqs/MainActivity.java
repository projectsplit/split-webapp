package com.buqs;

import android.graphics.Color;
import android.os.Bundle;
import android.view.View;

import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.getcapacitor.BridgeActivity;

/**
 * Keeps the web layer out from under the system bars.
 *
 * Android 15 onwards enforces edge-to-edge for anything targeting SDK 35+, and the old
 * setDecorFitsSystemWindows opt-out is ignored, so the WebView is handed the entire screen — status
 * bar and gesture pill included. Capacitor 8 offers no configuration for this.
 *
 * Doing it here rather than in CSS is a deliberate choice. The web app draws around forty overlays
 * with `position: fixed; top: 0`, and a fixed element is positioned against the viewport, so it
 * escapes any padding an ancestor holds. Handling insets in CSS would therefore mean teaching every
 * one of those overlays separately, missing some, and reintroducing the bug with each new one. This
 * insets the WebView itself, so there is one rule and nothing downstream has to know about it.
 */
public class MainActivity extends BridgeActivity {

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

            view.setPadding(bars.left, bars.top, bars.right, bars.bottom);

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
}
