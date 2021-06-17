import axios from "axios";

export async function getToken({ query: { code } }, res) {
    const body = {
        client_id: process.env.OAUTH_CLIENT_ID,
        client_secret: process.env.OAUTH_CLIENT_SECRET,
        code,
    };
    const opts = { headers: { accept: "application/json" } };
    axios
        .post("https://github.com/login/oauth/access_token", body, opts)
        .then((_res) => _res.data.access_token)
        .then((token) => {
            console.log("token:", token);
            // res.redirect(`http://192.168.1.10:8080/?token=${token}`);

            res.send({ token });
        })
        .catch((err) => res.status(500).json({ err: err.message }));
}
