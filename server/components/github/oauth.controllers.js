import fetch from "node-fetch";
import User from "../user/user.model.js";

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

export async function authorize({ query: { code } }, res, next) {
    const token = await getToken(code);

    const user_res = await fetch("https://api.github.com/user", {
        method: "GET",
        headers: {
            Authorization: `token ${token}`,
            accept: "application/json",
        },
    });

    const user_json = await user_res.json();

    if (user_json.message) {
        res.send({ error: user_json.message, description: "Error while getting GitHub user object" });
        return;
    }

    let user = undefined;
    try {
        user = await User.findOne({
            username: user_json.login,
        });

        if (user) {
            if (!user.enabled) throw new Error("User is banned");
            // TODO: reply with our tokens
        } else {
            user = new User({
                username: user_json.login,
                email: user_json.email,
                profile_pic: user_json.avatar_url,
                desc: user_json.bio || "No description",
                isGitHubUser: true,
            });
            await user.save();

            // TODO: reply with our tokens
        }
    } catch (err) {
        res.send({ error: err });
        return;
    }

    res.send(user);
}
