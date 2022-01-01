import fetch from "node-fetch";
import User from "../user/user.model.js";
import TokenHandler from "../tokens/TokenHandler.js";

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

function craftUserSession(user, res) {
    const accessToken = TokenHandler.createAccessToken(user);
    const refreshToken = TokenHandler.createRefreshToken(user);

    if (accessToken && refreshToken) {
        // setting refresh cookie
        res.cookie("jid", refreshToken, {
            httpOnly: true,
            expires: new Date(Date.now() + 561600000), // cookie expires after 6.5 days
            path: "/user/refresh_token",
            sameSite: "Lax",
        });

        return accessToken;
    } else {
        res.status(422);

        throw new AuthenticationError("Unable to create token.");
    }
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
        } else {
            user = new User({
                username: user_json.login,
                email: user_json.email,
                profile_pic: user_json.avatar_url,
                desc: user_json.bio || "No description",
                isGitHubUser: true,
                isVerified: true,
            });
            await user.save();
        }
    } catch (err) {
        res.send({ error: err });
        return;
    }

    const accessToken = craftUserSession(user, res);
    res.redirect(`http://devsbunker.com/get_session?token=${accessToken}&username=${user.username}`);
}
