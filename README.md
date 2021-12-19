# Run Scanner

A barcode scanner designed for mobile devices. Created as a proof of concept for a local running club, the app aims to provide a covid safe alternative to a manual time recording process.

The app is currently mobile only and not responsive to desktop:
https://run-scanner-jg.netlify.app/

## Table of Contents

- [About](#about)
- [Technologies](#technologies)
- [How to Use](#how-to-use)
  - [Code](#code)

## About

A local running club had concerns around how to safely run events during the Covid pandemic due to a time keeping process that involved the handling of tokens. This barcode scanner app makes use of the barcode on membership cards as a non contact alternative to the physical tokens. The app keeps track of whether a scan is a runner's start or end time and displays them in a log table. If this idea was developed further, the log would be connected to the club's existing database.
After an initial 'start' scan there is a grace period within which if the barcode is double scanned the start time is updated, rather than registering as an end time.

## Technologies

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [Quagga Barcode Library](https://github.com/ericblade/quagga2)
- [Jest](https://jestjs.io/)
- [Github Actions](https://github.com/features/actions)

## How to Use

The app is currently designed for mobile and is not responsive for desktop.

- Load the app and select `Start`
- Select `Allow` in the permissions prompt so the app may use your device's camera
- Position the camera over the target barcode
- View recorded scans in the `Log` page

The app is deployed here: https://run-scanner-jg.netlify.app/

### Code

If you would like to run the app locally, fork and clone the repo and install dependencies.
This repo is set up with CI/CD to deploy to Netlify. Either remove or update this to fit your own workflow.

To install with all dependencies & start the react app:

```
$ cd ../sort-visualiser
$ yarn install
$ yarn start
```
