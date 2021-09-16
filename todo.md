# TODO

## Backend

-   [ ] better post sanitazation
-   [ ] serverside thumbnail compression
-   [x] send confirmation email for signup
    -   [x] only for normal users, not github ones
-   [ ] Create a /robots.txt route
-   [ ] better error handling
-   [ ] add rate limiting to email verification route
-   [x] new users cant view their profile, there's a bug realted to the posts aggregation
-   [ ] if the user changes its email we need to send a verification mail again ( consider removing this option)

## Frontend

-   [x] handle non existing users by showing a 404
    -   [ ] do it better
-   [x] don't update Vuex in the logoutUser function in graphqlService
-   [ ] add the eye button thing to signup card
-   [ ] Project card author link spans 100% of card (even if you cant see it, you can still click it)
-   [ ] mod email in user page doesn't work (the save btn doesn't work)
-   [ ] add the possibility to see users that we follow
-   [ ] add option to switch project card theme
-   [ ] hitting enter doesnt send comment and throws error
-   [ ] duplicate key errors in postfeed
-   [ ] add information about password requirements for the signup process alongisde some text to inform the user about email 
verification
-   [ ] Add logo to the little icon in the page tab

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
