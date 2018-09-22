# zap-ticker
A bitcoin &amp; litecoin ticker for zap-desktop

## Installation

```sh
$ git clone https://github.com/losh11/zap-ticker.git
$ cd zap-ticker
$ yarn
$ yarn start
```

This will start zap-ticker running on `localhost:3004` by default, unless an alternative port is specified. You should probably also use a nginx reverse proxy to set up full ssl with cloudflare.

## Endpoints

`GET /ticker/bitcoin` for Bitcoin rates

`GET /ticker/litecoin` for Litecoin rates
