# Carl Ras ecomm APP

This is a react native expo app

# Links

- [Expo](https://expo.dev)
- [Google play console](https://play.google.com/console)
- [Appstore Connect](https://appstoreconnect.apple.com/)
- [Semantic Versioning](https://semver.org/)
- [Expo build and publish](https://pagepro.co/blog/publishing-expo-react-native-app-to-ios-and-android/)

<br/>

# Getting Startet

## Development

### 1) Pull down the project

```bash
git clone ....
```

### 2) Install dependencies

```bash
yarn install
```

### 3) Install expo app from app store

Open apple/android store and install expo app on your phone

### 4) Run app

```bash
Expo start
```

Scann QR and open in expo app
<br/><br/>

# New Release

Certificates for both iOS and android is configured on expo dev.

## 1) Create new version

For details about versioning see [Semantic Versioning](https://semver.org/)

### Major and Minor)

- In app.json

  - Update version (if needed)
  - Increase buildNumber and versionNumber

  <br/>

## 2) Expo build

### Android

```bash
eas build --platform android

✔ Choose the build type you would like: › apk
```

#### Wait for build to finish

```bash
⠋ Build queued...

✔ Build finished.
Successfully built standalone app: https://expo.dev/artifacts/xxxxxxx-xxxxx-xxxx-xxxx-xxxxxxxxxx
```

### iOS

```bash
eas build --platform ios

Choose the build type you would like: › archive

Do you have access to the Apple account that will be used for submitting this app to the App Store? › (Y/n)

✔ Apple ID: … your@email

✔ Select a Team › Carl Ras A/S - Company/Organization (9HV2XGGHH3)

✔ Select a Provider › Carl Ras A/S (1142482)
```

#### Wait for build to finish

```bash
⠋ Build queued...

✔ Build finished.

Successfully built standalone app: https://expo.dev/artifacts/xxxxxxx-xxxxx-xxxx-xxxx-xxxxxxxxxx
```

<br/>

# Upload to appstores

### Expo.dev login

Search for expo.dev in dashlane, request access

### Android

- Download apk/app-bundle file from expo.dev
- Log into google play console (impact account)
- Create new test release
  - Promote release to production when ready

### iOS

- Download ipa file from expo.dev
- Use transporter to push ipa file to app store connect
  - Organization: Carl Ras
- Log into appstoreconnect
  - Go to testFlight and create a new test release

<br/><br/>

### Terminal

- Navigate to "DEPLOYING TO APP STORES" section
  - [Expo build and publish](https://pagepro.co/blog/publishing-expo-react-native-app-to-ios-and-android/)

# TODO

- Auto increase buildNumber and versionNumber in app.json
- Auto publish to stores from expo
