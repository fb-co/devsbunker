import fetch from "node-fetch";

async function getToken(code) {
    const data = {
        client_id: process.env.OAUTH_CLIENT_ID,
        client_secret: process.env.OAUTH_CLIENT_SECRET,
        code,
    };

    const token_res = await fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            accept: "application/json",
            "Content-Type": "application/json",
        },
    });

    const token_json = await token_res.json();
    return token_json.access_token;
}

export async function authorize({ query: { code } }, res) {
    const token = await getToken(code);

    const user_res = await fetch("https://api.github.com/user", {
        method: "GET",
        headers: {
            Authorization: `token ${token}`,
            accept: "application/json",
        },
    });

    const user_json = await user_res.json();
    res.send({ user: user_json });
}
