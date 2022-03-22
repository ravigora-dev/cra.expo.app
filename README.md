# Carl Ras ecomm APP

This is a react native expo app

# Links

- [Expo](https://expo.dev)
- [Google play console](https://play.google.com/console)
- [Appstore Connect](https://appstoreconnect.apple.com/)

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

Open apple/android store and install expo app

### 4) Run app

```bash
yarn start
```

Scann QR and open in expo app

# New Release

Certificates for both iOS and android is configured on expo dev.

### 1) Create new version

Increase buildNumber and versionNumber in app.json

### 2) Expo build

#### Android

```bash
expo build:android
```

#### iOS

```bash
expo build:ios
```

## Upload to appstores

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
