# Buqs for iOS

The plan for the iOS app, built on branch `ios-app` (started 2026-11-12 from master at 0.0.234).
Tick items off here as they land.

## Where it stands

- **One bundle, two shells.** The iOS app is the same React bundle in a Capacitor 8 shell, as on
  Android. `ios/App` is Capacitor's Swift Package Manager template: bundle id `com.buqs`, iPhone
  only, iOS 15 and later, icon and launch screen generated from `assets/logo.png`.
- **No Mac.** `.github/workflows/build-ios.yml` compiles the app for the simulator, unsigned, on
  GitHub's macOS runners, which are free for public repositories. Signing and TestFlight come once
  there is an Apple Developer account.
- **Windows writes broken Swift paths.** `cap sync` and `cap update` on Windows put backslashes in
  `ios/App/CapApp-SPM/Package.swift`, which a Mac cannot read. `scripts/ios-spm-paths.mjs`, run by
  the `capacitor:update:after` script, puts forward slashes back.
- **The web layer doesn't know about iOS yet.** Payment capture (`isAndroidApp`) and push (no
  `PushAvailability` plugin on iOS yet, which counts as "no") hide themselves. Tips and Google
  sign-in don't; see Phase 1.

## Capturing payments

Android reads the notifications that payment apps post. iOS gives no app access to other apps'
notifications, so the iOS app needs another source. There are two, and they suit different people.

### FinanceKit

Apple's API for the financial data in Wallet.

- **United Kingdom:** iOS 18.4 or later. It reads the accounts people have connected in Wallet
  through open banking, from Barclays, Barclaycard, First Direct, Halifax, HSBC, Lloyds, M&S Bank,
  MBNA, Monzo, Nationwide, NatWest, Royal Bank of Scotland and Santander.
- **United States:** iOS 17.4 or later; Apple Card, Apple Cash and Savings.
- **Nowhere else yet.** Apple lists only the UK and the US; nothing in the EU.
- **Not only Apple Pay.** In the UK it is the account's transactions: online card purchases, direct
  debits, transfers and money coming in all arrive. The review has to keep the debits that look like
  purchases and leave the rest out.
- **While the app is closed.** iOS 26 adds a background delivery extension: a separate target,
  sharing an App Group with the app, that is told when the data changes. Without it, the app reads
  what changed since its last history token whenever it opens.

It needs Apple's permission. The Account Holder of an **organization** developer account requests a
managed entitlement, granted per bundle id, and Apple reviews each request against its criteria: the
app is in the Finance category, is on the App Store in the UK or the US, and provides financial
management tools (spending trends and budgets count). The app also declares
`NSFinancialDataUsageDescription`. Apple publishes no timeline.

Sources: [Get started with FinanceKit](https://developer.apple.com/financekit/),
[FinanceKit documentation](https://developer.apple.com/documentation/financekit),
[Implementing a background delivery extension](https://developer.apple.com/documentation/financekit/implementing-a-background-delivery-extension).

### Apple Pay taps, through Shortcuts

Since iOS 17, a personal automation in the Shortcuts app can run when the person pays by tapping a
card in Wallet (the "Transaction" trigger, called "Wallet" on newer iOS). It hands the shortcut the
merchant, the amount and the card.

- Buqs exposes an App Intent, "Add a payment to Buqs" (amount, merchant, card), that keeps the
  payment for review without opening the app. Set to run immediately, the automation asks nothing at
  the till.
- It works wherever Apple Pay works, with any card, from an individual developer account, with no
  approval from Apple.
- The costs: each person sets the automation up once in Shortcuts (apps cannot create automations,
  so Buqs shows the steps), it only sees taps with a card in Wallet, and the trigger is known to miss
  some.

### Recommendation

Feed both into the review sheet that already exists, Shortcuts first. It can ship in the first iOS
release and covers every market. FinanceKit follows once there is an organization account; send the
entitlement request the day that account exists, because Apple's review time is unknown.

### Fitting it into the existing code

- **Same plugin, new native side.** Keep the plugin name `PaymentCapture` and the contract in
  `src/helpers/paymentCapture/paymentCapture.ts`, and give it a Swift implementation. For FinanceKit:
  `getStatus` reports the authorization status; `openAccessSettings` calls `requestAuthorization()`
  (Apple's own sheet, where the person picks accounts and a time range); sources are Wallet accounts
  instead of apps; `getCaptures` returns new debits since the last history token.
- **Structured captures.** `CapturedPayment` is shaped like a notification (`title`, `text`), and
  `parsePayment` reads the amount out of it. Add optional `source`, `amount`, `currency` and
  `merchant` fields, and skip parsing when they are present. Shortcuts hands the amount over already
  formatted, so a tap could also go through `parsePayment` as text.
- **Ids.** Keep the name-based UUIDs: from FinanceKit's transaction id, or from amount, merchant and
  minute for a tap. A pending FinanceKit transaction keeps its id when it is booked, so it must
  update its capture rather than add a second one.
- **Storage.** One JSON file in the App Group container, which the app, the App Intent and the
  background extension can all reach. As on Android: kept out of backups, pruned at 60 days, and
  cleared by `forgetPaymentsOnDevice`.
- **Words.** "Payments from notifications" in Settings (`Menus/PaymentCaptureMenu`) and its step in
  `WelcomeTour` become platform-specific. The privacy policy gains an iOS section, and the App
  Store's App Privacy answers declare financial info.

## Parity with Android

| Area | Android today | iOS work |
| --- | --- | --- |
| Origin and CORS | Served from `https://localhost`, which the server allows | iOS serves from `capacitor://localhost`, because WKWebView takes no custom handler for https. Add it to `WithOrigins` in SplitServer's `Program.cs`. |
| Staying signed in | Refresh token in an HttpOnly `SameSite=None` cookie on the API's domain, which the Android WebView accepts | WKWebView has blocked third-party cookies since iOS 14, so refreshing would fail and people would be signed out. Test this first. The fix is either App-Bound Domains (`WKAppBoundDomains` in Info.plist plus `ios.limitsNavigationsToAppBoundDomains`), or native clients keeping the refresh token in the Keychain and sending it in the request body. |
| System bars | `MainActivity` pads the WebView and zeroes `env(safe-area-inset-*)`, because about two dozen full-screen surfaces are `position: fixed; top: 0` | Capacitor's default runs the web view under the status bar and the home indicator. Do as Android does: a `CAPBridgeViewController` subclass that keeps the web view inside the safe area, on black. Local plugins get registered there too. |
| Keyboard | SystemBars pads by the keyboard height; `adjustNothing` | Choose the Keyboard plugin's resize mode, then recheck forms, the amount calculator and the review sheet's focused row. |
| Back | Hardware back through `useAndroidBackButton` | There is no back button. Check every overlay has a visible way out, and decide whether edge-swipe back is wanted next to swipe tabs and drag-to-close sheets. |
| Google sign-in | `@capgo/capacitor-social-login`; the id token is minted for the web client id | Needs an iOS OAuth client (bundle id `com.buqs`) in the Google Cloud project that holds the web client, its URL scheme in Info.plist, and the server accepting that audience as well (`AuthSettings.GoogleClientId` is a single value). |
| Sign in with Apple | None | App Review guideline 4.8 asks for an equivalent private login wherever Google sign-in is offered. Use the same plugin's Apple provider. The server verifies Apple's identity token and links accounts, and account deletion revokes the Apple token, which Apple requires. |
| Push | FCM through the Firebase project that has the Android apps; `PushAvailability` plugin | Add an iOS app to the same Firebase project and upload an APNs auth key. Add Firebase Messaging so that the push plugin hands out FCM tokens instead of raw APNs ones (Capacitor's Firebase guide changes `AppDelegate`). Write `PushAvailability` in Swift. Server: an `ApnsConfig` next to the `AndroidConfig` in `SendViaFcm`. |
| Tips | Play Billing through `@capgo/native-purchases`; the server verifies Play tokens and takes Play's notifications | The same plugin speaks StoreKit 2. Create the three consumables in App Store Connect. The server verifies the signed transaction and takes App Store Server Notifications v2 for refunds. Until then, iOS must stay off the Play paths (Phase 1). |
| Location | Location permissions in the manifest | Purpose string added. WKWebView can also ask a second, web-style question naming "localhost"; if it does, use `@capacitor/geolocation` on iOS. |
| Maps (Plus) | Maps JavaScript key with referrer rules | Check that the key accepts the iOS origin; otherwise use a second key for iOS. |
| Invitation links (`/j/`) | `assetlinks.json` with `autoVerify` | Universal Links: `public/.well-known/apple-app-site-association` with the Team ID, and the Associated Domains capability `applinks:buqs.uk`. `AppUrlListener` already handles the opened link. |
| Export and share | Filesystem, Share, FileProvider | Same plugins; test the share sheet and saving to Files. |
| Offline mode | IndexedDB; `ACCESS_NETWORK_STATE` keeps `navigator.onLine` current | Check the online and offline events in WKWebView with airplane mode. |
| Account deletion | In Settings | Already meets Apple's in-app rule; add the Apple token revocation. |
| Privacy | Data safety form | `PrivacyInfo.xcprivacy` for the app's own code (plugins ship their own), and the App Privacy answers in App Store Connect. |
| Facebook SDK | Left out through the plugin's provider settings | The social-login plugin's Swift package links it anyway (8.7.9 too). It does nothing without a Facebook app id but adds size; watch for the plugin making it optional. |

## Building without a Mac

- **Every push** to `ios-app` that touches the native side compiles on a macOS runner.
- **Signed builds** come next: a manual workflow that archives the app and uploads it to TestFlight
  with an App Store Connect API key (`ASC_KEY_ID`, `ASC_ISSUER_ID`, `ASC_KEY_P8`), plus the
  distribution certificate, or with automatic signing through the same key.
- **Versions:** `MARKETING_VERSION` from `package.json` (0.0.x), and `CURRENT_PROJECT_VERSION` from
  its last number, as Android's versionCode does.
- **Testing** is TestFlight. An iPad covers most of it: an iPhone-only app runs there in
  compatibility mode, in an iPhone-sized window, which Apple asks developers to test before
  submitting anyway. It does not show the notch, the Dynamic Island, the home indicator or the iPhone
  keyboard; iPhone simulator screenshots from CI cover those. It cannot test capture: an iPad has no
  Wallet to pay with, and FinanceKit is iPhone only, so the real Apple Pay test needs an iPhone (a
  tester's, or a used one).
- **TestFlight testers:** internal testers (up to 100 people on the team) need no review; external
  testers need a Beta App Review first. Apple has no equivalent of Play's 12-tester closed test.
- **Debugging the web view** needs Safari's Web Inspector, which only runs on a Mac. Without one:
  an on-screen console (such as eruda) in test builds only, or a cloud Mac for a day.
- **After changing plugins,** run `npx cap sync ios`; the hook fixes `Package.swift`. Native changes
  can only be compiled by pushing; `gh run list --workflow build-ios.yml` and
  `gh run view <id> --log-failed` show the result.

## Phases

### 0. Accounts (people, not code)

- [ ] Apple Developer Program, $99 a year. An individual membership is quick and covers everything
      except FinanceKit. An organization membership needs a legal entity and a D-U-N-S number, and
      FinanceKit requires one. An individual membership can be converted later, but Apple's
      documentation does not promise that the Team ID survives, and Sign in with Apple user ids and
      Universal Links depend on it: get it confirmed by Developer Support before converting.
- [ ] App ID `com.buqs` with Push Notifications, Sign in with Apple, Associated Domains and App
      Groups (`group.com.buqs`).
- [ ] App Store Connect app record, and the three tip products as consumables.
- [ ] APNs auth key uploaded to Firebase; iOS app `com.buqs` in the Firebase project, with its
      `GoogleService-Info.plist`.
- [ ] iOS OAuth client for Google sign-in.
- [ ] Test devices: an iPad on iPadOS 15 or later for most testing. The Apple Pay capture needs an
      iPhone with a card in Wallet: a TestFlight tester's or a used one (iPhone 11 or later runs iOS
      26; FinanceKit in the UK needs iOS 18.4).
- [ ] Once there is an organization account: the FinanceKit entitlement request.

### 1. The shell runs on a phone

- [x] Branch, Capacitor iOS platform, icon and launch screen, iPhone only, location purpose string,
      encryption declaration, CI compile.
- [ ] First green CI build.
- [ ] Safe areas and keyboard: the view controller subclass.
- [ ] SplitServer allows `capacitor://localhost`.
- [ ] The refresh-cookie test, then App-Bound Domains or the token in the body.
- [ ] Keep iOS off the Play-only paths: `isBillingAvailable`, `DonationPrompt`, `DonationForm`,
      `SupportMenu` and `useRecoverDonationPurchases` all use `isNativeApp()` to mean "has Play
      Billing". Hide the Google button on iOS until its client id exists.
- [ ] Signed build and TestFlight workflow; first install; username and password sign-in survives a
      restart and an expired access token.

### 2. Parity

Google and Apple sign-in, push, Universal Links, location and maps, export and share, offline mode,
StoreKit tips, privacy manifest.

### 3. Apple Pay capture through Shortcuts

The App Intent and the App Group store, `PaymentCapture` in Swift, structured captures in the web
layer, the Settings and tour wording, the setup guide, and the privacy policy. Buqs's side can be
tested on an iPad by running the action by hand with made-up values; the real trigger needs an
iPhone at a till.

### 4. App Store

The listing (Buqs as an expense manager), 6.9-inch iPhone screenshots of the real app, App Privacy
answers, an age rating, review notes with a demo account, an external TestFlight round, then
submission. The review notes should name what the app does natively (push, Apple Pay capture,
offline mode), because App Review turns down apps that are only a website in a wrapper (guideline
4.2).

### 5. FinanceKit

The entitlement, the Finance category, `FinanceStore` behind `PaymentCapture`, filtering to
purchases, the background delivery extension, and the privacy policy.

## Risks

- **FinanceKit may not be granted,** or may take long; nothing published says how long.
- **Cookies** (Phase 1) decide whether people stay signed in.
- **The Team ID** when converting to an organization.
- **No Web Inspector** without a Mac makes bugs that only happen in WKWebView slow to chase.
- **WKWebView is not Chrome:** the keyboard and visualViewport, date inputs and scrolling all need a
  pass on a real phone.
