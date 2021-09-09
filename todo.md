# TODO

## Backend

-   [ ] better post sanitazation
-   [ ] serverside thumbnail compression
-   [ ] send confirmation email for signup
    -   [ ] only for normal users, not github ones
-   [ ] Create a /robots.txt route
-   [ ] better error handling

## Frontend

-   [x] handle non existing users by showing a 404
    -   [ ] do it better
-   [ ] don't update Vuex in the logoutUser function in graphqlService
-   [ ] add the eye button thing to signup card
-   [ ] Project card author link spans 100% of card (even if you cant see it, you can still click it)
-   [ ] mod email in user page doesn't work (the save btn doesn't work)
-   [ ] add the possibility to see users that we follow
-   [ ] add option to switch project card theme
-   [ ] hitting enter doesnt send comment and throws error

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
