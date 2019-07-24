# frog-ui

It’s a web application written in HTML5 (HTML, JavaScript, CSS and XHR) to provide you with a rich and responsive example of user interface.

When you interact with the interface, Frog Turnkey UI sends/receive HTTP requests/responses to/from the middleware, through a REST server called `wyrest`.

Frog Turnkey UI relies on `webkitlauncher` and is designed according to the capabilities of Webkit.

## Setup

```console
$ cd /path/to/apps_frog-ui/
$ npm install
```

## Usage

### Development server

Start the `webpack-dev-server` with:

```console
$ npm start
```

Sources will be watched and recompiled on file change. If you have the app
opened in a browser, code that has changed will be hot-reloaded as well.

Open the UI in your webkit based browser using the following URL:

```
http://<your_workstation_ip>:8080/?stbIp=<your_stb_ip>&[otherOptions]
```

Where `otherOptions` are:

- `broadcast=string` to choose which kind of tuner the STB uses (where `string` can be `dvbc`, `dvbs`, `dvbt`)
- `debug` to activate helpers in the console (desktop-only)
- `freqStart=xxxxxxxx` (where `xxxxxxxx` are digits) to define start frequency for DVB-S scan (in Hz)
- `freqEnd=xxxxxxxx` (where `xxxxxxxx` are digits) to define end frequency for DVB-S scan (in Hz)
- `keymap=string` (where `string` can be: `defaultRCU` or `pc`) to choose the RCU layout for controlling the UI
- `channelListStyle=string` (where `string` can be: `withLogos` or `textonly`)
- `logoBase=/path/to/logo/` specify the path to channel logos (path on the STB and served by the REST server)
- `homeOrientation=string` (where `string` can be: `horizontal` or `vertical`)
- `homeItems=demo,tv,tv recordings,epg,vod,application store,media player,settings`

NOTE: A `config.json` file located at the root of the frog-ui source code lists all available options and their default
values. Also you can override on your desktop the `config.json` using the `config.local.json`

### Build

- Development: `$ npm run build`
- Production: `$ npm run build --production`

### Generate documentation

You can generate the `core` documentation

```console
$ npm run build-doc
```

It will produce an `esdoc/index.html` file you can easily browse from your favourite web browser.

### Run tests:

You can execute the test suite:

```console
$ npm test
```

Also, you can generate the coverage using:

```console
$ npm run test-cov
```

## Getting Started

Please read [this tutorial][tutorial] that explains you how to add a new item on the main HUB and interact with REST api

[tutorial]: doc/howtos/HelloWorld.rst

