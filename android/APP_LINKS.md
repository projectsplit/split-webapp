# Digital Asset Links

`assetlinks.json` is what lets Android open `https://buqs.uk/j/<code>` invitation links in the app
instead of a browser. Android fetches it at install time, and hands links over only if the app's
signing certificate is listed here.

## Filling it in

Both fingerprints belong in the list, and leaving either out breaks a real case:

- **Play App Signing** — Google re-signs every build it distributes, so this is the certificate on
  the app people actually install. Play Console → your app → Test and release → Setup → App
  integrity → App signing key certificate → SHA-256.
- **Upload key** — the certificate your CI signs with, which is what a sideloaded APK from the
  Build Android workflow carries. Without it, links do not work on your own test installs:

  ```
  keytool -list -v -keystore upload-keystore.jks -alias <your alias> | grep SHA256
  ```

Paste them as uppercase hex with colons, exactly as the tools print them.

### What is in the list now

JSON cannot carry comments, so the four entries are explained here, in the order they appear:

1. `AC:92:2C:…` — the Play App Signing key (RSA). The certificate on every Play install up to
   Android 16, and the one Play Console shows.
2. `27:D8:16:…` and
3. `5A:59:57:…` — two more certificates Play adds for Android 17, which verifies a newer signature
   scheme. The last is a post-quantum (ML-DSA) key, and on Android 17 it is the one the system
   reports as the app's signer: `adb shell dumpsys package com.buqs` lists it under `Signatures`.
   Leave it out and invitation links stop opening in the app on Android 17 only.
4. `AB:F6:5B:…` — the upload key, for a release build installed directly rather than through Play.

Play Console only shows the first. The other two were read off a Play-installed copy:
`adb pull` the `base.apk` named by `adb shell pm path com.buqs`, then look inside its APK Signing
Block. `apksigner verify --print-certs` from build-tools 35 does not understand the newer block and
reports the RSA key alone.

## Checking it works

The file has to be reachable at `https://buqs.uk/.well-known/assetlinks.json`, over HTTPS, with no
redirect, served as `application/json`. Two things commonly get in the way: nginx's default
`location ~ /\.` rule refuses any path segment beginning with a dot, and some static hosts drop
dot-directories from the build output entirely — so confirm it is actually being served rather than
assuming it shipped with `dist/`.

Google's verifier reports what it sees:

```
https://digitalassetlinks.googleapis.com/v1/statements:list?source.web.site=https://buqs.uk&relation=delegate_permission/common.handle_all_urls
```

And on a connected device, after installing:

```
adb shell pm get-app-links com.buqs
```

`verified` is the answer you want. Verification failure is silent — the links simply keep opening in
the browser — so it is worth checking once rather than waiting to notice.
