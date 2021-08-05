# Before-Deployment

## Maybe?

-   [ ] consider switching to `refs` like i did for the comments, this implies a ton of refactoring tho

## About page

-   [x] use light cards for light mode
-   [ ] use more assets in page body (svgs made in Figma and text, not just text)
-   [ ] increase subtitles size
-   [ ] apply animations and size adjustements to smaller screens

## High Priority

-   [x] Stoopid ass notifications stopped working randomly (check console)
-   [x] make sure to toggle back on clientside post validation

-   [x] links should not be mandatory

-   [x] Limit length of things like email

-   [x] rate-limiting on other routes such as GraphQL stuff (only critical ones, for less critical routes we should add a less strict rate limiter)

    -   check out configs/RateLimiter to add rules

    -   i couldnt find a ratelimiter for GraphQL that worked with Apollo, might need more time/help/make a custom one

    -   [x] test it by also adding feedback

-   [x] some languages tags like Javascript throw Invalid Language Tag error

    -   [x] must be something related to the serverside langiages list, havent been able to fully check out your latest progress for tags

-   [x] fix more options layout in descriptive cards

-   [ ] remove that vue config before deploy

-   [ ] better error handling EVERYWHERE, check [this](https://dev.to/andre/handling-errors-in-graphql--2ea3)

-   [x] after u delete your account there's a delay where nothing happens, we should add some visual feedback there

    -   [ ] posts also still appear after account deletion, you need to rerefsh (this doesnt seem a big deal but maybe we could remove them from the cache after this happens)

-   [x] convert timestamps to actual dates (like in comments) (Im checking this off because its been done for a while, check TimeStampService.js)

-   [x] comments
-   [see this](https://stackoverflow.com/questions/29078753/how-to-reference-another-schema-in-my-mongoose-schema)
-   [x] comments are still broken if you view a post after a comment is made. This is due to the fact that we need to use the .populate() thing while fetching the entire post since I've used refs in the schema
-   [x] migrate remaining (if any) routes to use the new method, right now ive only migrated getPostById. Basically EVERYWHERE we ask for comments we must perform that operation
-   [x] add reply field to comment
-   [x] Delete comments when deleting posts (remember to delete them when the user deletes their account too)

-   [x] when you view a post the links should display the link itself and not just the favicon of that site (maybe make a list)

-   [x] cache

-   [x] Add very small box shadow to notifications to give them a bit more contrast
-   [x] Make the share option on a post actully copy the url
-   [x] Looking at search results, and going into a post, then going back again should save the search and search results
-   [x] Add caching to the search results
-   [x] Add back arrow, like, and save button to post view desktop

-   [x] hot reloading after a new post is made doesnt work anymore

-   [x] Improved loading everywhere

    -   [x] When you click post on newpostmobile
    -   [x] On the post feed page when posts could be loading (right now just says no posts found)
    -   [x] Notifications page should show 'no new notifications when there are none'
    -   [x] when saving new options

-   [x] Add informative popup to new post query tags (contributers, links, tags, etc.)

-   [x] switch to text area for post description instead of div with contenteditable

-   [ ] port detailed proj cards to mobile

-   [x] LOGO

    -   [ ] maybe

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

-   [x] avoid sending notification if users like their own posts

-   [x] fix that troll commit

-   [x] update Detailed proj cards to work with latest progress and polish them

-   [x] desktop and mobile settings page needs some polishing

-   [x] carousel broken when there are no images

## Low Priority

-   [x] Optimize notification bell, and make a standardized component (ill do this)

-   [x] mark as read as soon as user navigates to notification page (hot reload)

-   [x] Redundant navigation errors for some reason in the User pages (try clicking around the tabs a bit and you should see them)

-   [x] Right after you create a post and it hot reloads, you can't like or save it until you refresh (doesn't show graphically)

-   [x] Remove all follow buttons for yourself since they don't work it can be confusing

-   [x] Post view should have static left and right content (maybe)

-   [x] Add confirmation when you try and delete a post

-   [ ] add better types to Mongoose documents. For example "Array" should be replaced with something like `[SomeSpecificObject]`

-   [ ] remove console logs from everywhere before production

## Post cache improvement

-   2 arrays, one for full posts and the other one for cards
    -   cards should be cached according to their filter

### Project cards

1. Fetch posts
2. cache everything
   if we change filter for the first time we just ask the server

organize in the following way:

```
type: stuffToCache {

  {
    fiter
    sortintype
    posts
  },
  {
    differentfilter
    differentsortingType
    posts
  }

}
```

3. if user changes filter --> ask cache
   if cache says no ask server

4. update cache on like, save, delete

### Full post

1. Make a different array
2. ask to that array when u open a post

### Methods

```
* addPosts(filter: string, sortingType: string, posts: Array<Post>) --> MUTATION
* getPosts(filter: string, sortingType: string) ---> GETTER
* updatePost(fieldsToUpdate: [{ field: fieldName, newValue: theNewValue }, {more fields}]) --> Can't use full post obj since not all values are return
* cacheFullPost(post: Post) --> MUTATION
* getFullPost(id: string) --> GETTER

```
