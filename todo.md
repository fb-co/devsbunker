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

## How to verify email addresses

### Resources

- [Email verification in Nodejs and JWTs (PROBABLY WHAT WE WANT)](https://stackoverflow.com/questions/51336641/email-verification-using-nodejs)
- [Email verification in Nodejs with Nodemailer (I'D USE A JWT INSTEAD OF A RAND STRING)](https://safwan-du16.medium.com/email-verification-with-node-js-and-nodemailer-3a6363b31060)
- [How to implement Email Verification feature in your NodeJS app using Express, SendGrid, Sequelize ORM(MySQL).](https://medium.com/the-andela-way/how-to-implement-email-verification-feature-in-your-nodejs-app-using-express-sendgrid-sequelize-e5b255bf92a2)
- [How to verify an email address using nodejs (USING THIRD PARTY API)](https://medium.com/whois-api/how-to-verify-an-email-address-using-node-js-449330a47a7e)
- [Verification email templates](https://www.liveagent.com/templates/verification/)
- [Email verification in Firebase (WE DON'T USE FIREBASE BUT MAYBE IT'S USEFUL)](https://www.section.io/engineering-education/email-authentication-and-verification-nodejs-firebase/)

### Process

This is how I'd do email verification after reading stuff online.

- [ ] Add `isVerified` to the user model
- [ ] Create a new Mongo document (table) where we store the `userId` (to avoid duplicates), the `email` and a new `JWT` that we are going to use for email verification. Still gotta decide the `exp` date on this one.
- [ ] Setup a route to verify email addresses such as `/user/verify/:userId/:JWT`. We gotta decide if this route will be protected (must login to view it) or not. I think we can leave this open so users can verify (for example) from their phone where they don't have a session on devsBunker
- [ ] In that route we just go `findOne({userId, JWT})` from the previously created table. If we find a match and the JWT is not expired we modify the `isVerified` field in the user document. If the JTW is expired we put a button to send another email
- [ ] We gotta decide what happens when the user doesn't verify the email address. We could block the user from logging in after something like 2 days of not being verified or, to avoid spammers, we could allow logins ONLY if you become verified (I think I prefer this one). Basically we delay issuing JWTs after signup.

