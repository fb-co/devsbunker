<h1 align="center">devsBunker</h1>
<p align="center">A platform where developers can promote their work for free.</p>

## Development setup

### Requirements

* Node
* MongoDB

### Run

Make a .env file inside server/ with the following values


| HOST         | your host IP (localhost, 192.168.1.X)                   |
|--------------|---------------------------------------------------------|
| PORT         | your port                      |
| DB_URI       | mongodb address (mongodb://localhost/YOUR-DB-NAME-HERE) |
| LOGIN_SECRET | a key for signing JWT tokens                            |