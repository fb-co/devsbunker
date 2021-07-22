import rateLimit from "express-rate-limit";

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', 1);

const LimiterOneReq15Min = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1,
    message: {
        error: true,
        type: "rate limit",
        message: "Too many requests",
        handler: function (_, res) {
            res.status(options.statusCode).json(options.message);
        },
    },
});

export { LimiterOneReq15Min };
