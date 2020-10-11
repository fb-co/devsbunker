# TODO

## Backend

-   [ ] send confirmation email for signup
-   [x] implement login system
    -   [x] better error handling for both login and signup
-   [x] implement the auth route
-   [x] add more informations to the about and home page
-   [x] make Schema for posts
-   [x] make Schema for bunkers
-   [ ] provide the current user email where needed (?)
-   [x] cosnider switching to ES modules
-   [ ] multiple devices logged into once account
-   [x] delete all REST endpoints
    -   [x] except refresh_token and auth
-   [x] use AuthErrors in Signup (GraphQL)

## Frontend

-   [x] home page
-   [ ] about page
-   [x] login page
-   [x] signup page
-   [x] profile page
    -   [x] redirect here from login/signup in case of already present valid token
    -   [x] make a delete token method (logout)
-   [x] handle 404 errors
-   [x] make a post page
-   [x] use .env
-   [x] fix mobile view scrolling bug
-   [x] add delay between form submission and server response (like a loading gif) to slow down potentials brute force attacks to the login and signup page
-   [x] error handling for the settings: if we pass a non valid setting like /settings/test it still displays stuff and not a 404
-   [x] change url dynamically based on selected setting option
-   [x] The theme changin icon (sun and moon) should be inverted to denote which theme the user is currently using
-   [ ] Make the first field in the login and signup pages be auto focused on when thep age is loaded

## Glitches

-   [x] if a logged in user refreshes the page the profile link in the navbar and in the burger disappears, Login and Signup take its place (like if the user was not logged in)
-   [ ] Fix browser back arrow button in some pages after 404
-   [x] Fix Hamburger Menu
-   [x] Random scroll space on bottom of login/signup cards on mobile
-   [x] Cant scroll to the top when resizing vertically
-   [x] if page gets refreshed the theme switches back to Dark
-   [x] Both password field and confirm password field both have id of 'password'
-   [x] Toggling show password icon highlights the 'forgot password' link
-   [x] Tapping or clicking outside burger menu on small screens should close it
-   [x] For a very small horizontal resize range, there are no Nav links or burger menu
-   [x] If burger menu not closed when page is expanded, when you shrink the page again it instantly opens the burger menu again
-   [ ] Cant use the back arrow at profile page (sometimes)
-   [x] Cant Highlight text inside navbar and burger menu search inputs only on dark theme
-   [x] Profile page mobile support stopped working for some reason
-   [x] When visiting someone elses profile, and clicking on the profile picture in the navbar, it wont bring you back to your own profile
-   [x] Logout button in the left sidebar routing does not work
-   [x] Look at the console when you switch themes in mobile mode :(
-   [ ] settings sections (account, privacy, etc) are still available in mobile version. This is not a real glitch but we have to decide what to do with it
-   [x] avoid refreshing access token if user is not logged in (not really possible)

## Deployment

-   [ ] Set Prod env variable to true
-   [ ] Remove all the console logs, including the one on Logout event
-   [ ] use a more accurate regex for emails
