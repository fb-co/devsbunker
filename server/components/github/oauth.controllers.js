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
            // could be done better but this is readable and easy to write
            let user_email = undefined;

            // if user has private email address just hack into their profile and rob it
            if (!user_json.email) {
                const user_email_res = await fetch("https://api.github.com/user/emails", {
                    method: "GET",
                    headers: {
                        Authorization: `token ${token}`,
                        accept: "application/json",
                    },
                });

                const user_email_json = await user_email_res.json();

                const tmp = user_email_json.filter((entry) => entry.primary);
                if (!tmp) throw new Error("Can't find valid email address.");

                user_email = tmp[0].email;

                if (/noreply/.test(user_email)) throw new Error("Can't find valid email address.");
            } else {
                user_email = user_json.email;
            }

            user = new User({
                username: user_json.login,
                email: user_email,
                profile_pic: user_json.avatar_url,
                desc: user_json.bio || "No description",
                isGitHubUser: true,
                isVerified: true,
            });
            await user.save();
        }
    } catch (err) {
        res.redirect(`${process.env.PROTOCOL}://www.${process.env.HOST}:${process.env.CLIENTSIDE_PORT}/error?type=github&msg=${err.message}`);
        return;
    }

    const accessToken = craftUserSession(user, res);
    res.redirect(`${process.env.PROTOCOL}://www.${process.env.HOST}:${process.env.CLIENTSIDE_PORT}/get_session?token=${accessToken}&username=${user.username}`);
}
