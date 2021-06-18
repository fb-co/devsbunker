import fetch from "node-fetch";

export async function getToken({ query: { code } }, res) {
    const data = {
        client_id: process.env.OAUTH_CLIENT_ID,
        client_secret: process.env.OAUTH_CLIENT_SECRET,
        code,
    };

    const result = await fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            accept: "application/json",
            "Content-Type": "application/json",
        },
    });

    const json = await result.json();
    res.send({ json });
}
