<h1 align="center">devsBunker</h1>
<p align="center">A platform where developers can promote their work for free.</p>

## Development setup

### Requirements

* Node
* MongoDB

### Run

Make a .env file inside server/ with the following values

| key          | value                                                   |
|--------------|---------------------------------------------------------|
| HOST         | your host IP                                            |
| PORT         | port number                                             |
| DB_URI       | mongodb address (mongodb://localhost/YOUR-DB-NAME-HERE) |
| LOGIN_SECRET | a key for signing JWT tokens                            |

Make a .env file inside client/ with the following values

| key                    | value                       |
|------------------------|-----------------------------|
| VUE_APP_LOGIN_API_URL  | your BACKEND LOGIN API URL  |
| VUE_APP_SIGNUP_API_URL | your BACKEND SIGNUP API URL |
| VUE_APP_AUTH_API_URL   | your BACKEND AUTH API URL   |

**NOTE: Don't store secrets inside this .env since it is client side and it will be accessible to everyone.**

Keys must be prefixed with 'VUE_APP_'.