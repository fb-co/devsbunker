/*
    [!] Explaination [!]

    Imagine that a logged in user wants to visit his profile, which is not accessible if a user isn't logged in.
    If the user visits /profile he makes a GET request and obviously we can't control and modify that first request, so on window.load
    we run a function (on the client of course) that fetches this route here with the JWT token. 
    Since we will be running the 'checkHeaderToken' middleware on every request (see token/tokenHandler) if we see that in the request theres a token we set 
    the user property on the request:

    ////////////////////
        if (token) {
            // verify the token 
            jwt.verify(token, process.env.LOGIN_SECRET, (err, user) => {

                // this can be avoided but it is more readable 
                if (err) {
                    req.user = undefined;
                    next();
                } else {
                    req.user = user; // we can access the user in every req
                    next();
                }
            });
        } else {
            next();
        }
    /////////////////////

    So even the fetch that we will run clientside (it is automated) is going to be checked by this function.
    This controller here just sends back the user that checkHeaderToken sets because if it does so we know that the user is authenticated!

    [!] HERE'S THE FULL FLOW [!]

    clientside we hide the content of the profile page

    <body style="display: none;" onload="authorize()">

    and we run a function similar to this

    ///////////////////////
    async function authorize() {
        const response = await fetch(API_URL, {
            headers: {
                authorization: `Bearer ${localStorage.token}`,
            },
        });

        [...] --> see end of comment for the rest of the code
    }
    ////////////////////////////

    the 'checkHeaderToken' middleware will 'intercepts' this request and will see that we have a token in the request and if it is valid it sets
    req.user to be that user specified in the JWT

    then this function below will respond back to the user with the user itself, this basically means
    that the user has a valid session

    then we run this code inside the authorize() function (see line 48)
    
    //////////////////////////////
    const result = await response.json();

    if (result.user) {
        console.log("Logged in as ", result.user);

        document.body.style.display = "";

        let userText = document.getElementById('username');
        userText.innerHTML += result.user.username;
    } else {
        logout();
    }
    //////////////////////////////

    So if we get a 'result.user' we show the content of the profile page, otherwise wer redirect to login.

*/

exports.isAuthorized = (req, res) => {
    if (req.user) {
        res.json({
            user: req.user
        });
    } else {
        res.json({
            message: "This is the auth process, make a request here with the authorization header to check if you are auhtorized to access specific routes."
        });
    }

};