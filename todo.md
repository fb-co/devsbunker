# TODO

## General

-   [ ] search for keywork "TODO" in the whole codebase

## Backend

-   [ ] better post sanitazation
-   [ ] serverside thumbnail compression (?)
-   [ ] Create a /robots.txt route
-   [ ] better error handling
-   [ ] add rate limiting to email verification route

## Frontend

-   [ ] Project card author link spans 100% of card (even if you cant see it, you can still click it)

### Things to optimize

-   [ ] we dispatch the store mutation to check if the user is logged in twice upon refresh (still need to figure out where we do it), we should reduce it to one.

## Glitches

-   [ ] settings sections (account, privacy, etc) are still available in mobile version. This is not a real glitch but we have to decide what to do with it

## Deployment

-   [ ] remove that vue config file
-   [ ] Set Prod env variable to true
-   [ ] Remove all the console logs, including the one on Logout event
-   [ ] use a more accurate regex for emails
-   [ ] clean the code
-   [ ] make sure not to include path details in gql errors
-   [ ] add NSFW image filter
