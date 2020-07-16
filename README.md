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