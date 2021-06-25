# Before-Deployment

## High Priority

-   [ ] LOGO

-   [x] Auto-update profile pics when you upload a new one

-   [x] Selecting more than five images while creating a new post graphically shows it in the menu, but only uploads the first five

-   [x] Make the Post thumbnail default placeholder image actully work

-   [x] Some user feedback when creating a post, logging out, etc

    -   [x] tried to use SuccessPopUp after logout in navbar but it wasnt working, I don't want to use a stoopid alert

-   [x] Prepare foreign profile page for deployment

    -   [x] IMPORTANT: if you navigate to something like /revenue or /saved (not present on the left side), the component still gets rendered

    -   [x] Shoulnt give option to change desc if its not your own profile page

    -   [x] Get rid of email option for foreign user

    -   [x] Spruce up the styling or functionality since it seems a little "empty"

    -   [x] Add cancel button to field edits (mobile and desktop)

-   [x] Highlight search phrases on post searches

-   [x] @focus and @blur does not work on iphone making a lot of the dropdowns and focus based menues not work

-   [x] GraphQLService line that reads "TODO: WE SHOULD NOT DO THIS HERE!!!!" (don't know what it is so ill leave this for you)

-   [x] Improve success and error popups

    -   [x] Layering is bad on mobile as it falls under the bottom navbar
    -   [x] Both show up in front of the burger menu

-   [x] Components which contain calc(100vh - var(--header-height)) need to account for the bottom navbar in mobile views or else two scrollbars show up

-   [x] Notifications don't get cleared immediatly after logging out

-   [x] Changing pages with the new post popup open leaves it open so you can't see the page behind it

-   [x] Alert box should have a max height where the newer alerts are prioritized (im struggling so hard with this for some reason)

-   [x] Issues with following people and changing passwords/deleting account authentication

    -   jac was (and still is) stoopid

-   [x] Add likeAmt and more options menu to project cards (mobile & desktop)

-   [x] new notifications are immediately marked as read for some reason. Ive tried to login with account X, like Y's post, logout and login as Y. The notification of the like was already marked as read

-   [ ] avoid sending notification if users like their own posts

-   [ ] when u view a post the links should display the link itself and not just the favicon of that site (maybe make a list)

-   [ ] fix that troll commit

-   [ ] update Detailed proj cards to work with latest progress and polish them

-   [ ] desktop and mobile settings page needs some polishing

## Low Priority

-   [x] Optimize notification bell, and make a standardized component (ill do this)

-   [x] mark as read as soon as user navigates to notification page (hot reload)

-   [x] Redundant navigation errors for some reason in the User pages (try clicking around the tabs a bit and you should see them)

-   [x] Right after you create a post and it hot reloads, you can't like or save it until you refresh (doesn't show graphically)

-   [ ] Remove all follow buttons for yourself since they don't work it can be confusing

-   [x] Post view should have static left and right content (maybe)

-   [ ] Add confirmation when you try and delete a post

-   [ ] add better types to Mongoose documents. For example "Array" should be replaced with something like `[SomeSpecificObject]`

-   [ ] remove console logs from everywhere before production
