# Velocity Dashboard

Velocity is a smart voice-activated dashboard. It integrates your Google Calendar with Google Maps traffic data, and will notify you when to leave to be on time for your next event. Choose between driving, walking, biking, and public transport, never be late again!

Velocity is listening to your commands, just say what event you want to add and the dashboard will automatically insert it into your calendar. You can also search the whole internet just with your voice!

![Velocity Dash screenshot](http://image-store.slidesharecdn.com/b518bc75-2c59-4299-941d-22be1ee036ec-large.png)

[Download it in the Chrome store](https://chrome.google.com/webstore/detail/velocity-dashboard/fllacnobnahiecimbbehfbiilpmhnmkk?hl=en-US&gl=US&authuser=2)

## Team

  - __Development Team Members__: Carl Chen, Derek Hoang, Jeff Leu

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Databases](#databases)
    1. [OAuth](#OAuth)
    1. [Webpack](#Webpack)
    1. [Server](#Server)


## Usage

To run just the extension, go to your Chrome browser's [extensions dashboard](chrome://extensions), open developer mode and load the client/dist folder after webpacking. You will need a local server running with a PostgreSQL database and a MongoDB, and authorization to use Google's OAuth2 & APIs. 

## Requirements

- Node 6.2.2
- PostgreSQL
- MongoDB
- Google Chrome


## Development

### Installing Dependencies

From within the root directory:

Install all npm dependencies.
```sh
npm install
```

### Databases

Using PostgreSQL, create a database for the project.

Using MongoDB, create a collection for Agenda.js to store jobs.

### OAuth

For authorization with Google, set up [Chrome extension OAuth](https://developer.chrome.com/apps/app_identity) with the manifest.json. Register the application in [Google's developer console](https://console.developers.google.com/) and request access to the Google Maps Distance Matrix API, Google Plus API and Google Calendar API. To get the application ID for OAuth access, you will need to add the extension as a draft (client/dist folder as a zipped file) to the Chrome store. You will also set up a web client OAuth for accessing the user's Google Calendar. Be sure to provide a callback url for the web client OAuth (localhost is okay for testing purposes). 

### Webpack
Initiate webpack to create your bundle.js.
```sh
npm run build
```

Or for hot reloading in React
```sh
npm run dev
```

### Server
Open the server with Nodemon.
```sh
npm start
```
