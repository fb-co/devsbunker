import dotenv from "dotenv";
dotenv.config();

import MailGunModule from "../../config/MailGun.js";
const domain = process.env.OUTBOUND_EMAIL_DOMAIN;

const EmailManager = {
    sendEmail: function(email_data) {
        console.log(email_data);
        MailGunModule.messages.create(domain, email_data);
    }
};

export default EmailManager;