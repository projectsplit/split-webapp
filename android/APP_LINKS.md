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
