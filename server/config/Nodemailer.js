import dotenv from "dotenv";
dotenv.config();

import { createTransport } from "nodemailer";

const Transporter = createTransport({
    service: "Gmail",
    auth: {
        user: process.env.FBCO_GMAIL_ADDR,
        pass: process.env.FBCO_GMAIL_PWD,
    },
});

export default Transporter;
