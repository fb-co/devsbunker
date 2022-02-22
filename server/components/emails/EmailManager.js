import dotenv from "dotenv";
dotenv.config();

import MailGunModule from "../../config/Mailgun.js";
const domain = process.env.OUTBOUND_EMAIL_DOMAIN;

// email templates
import { generateVerificationEmailTemplate } from "../../templates/email.html.js";

// misc imports
import UserVerification from "../../components/user/verification.model.js";
import User from "../../components/user/user.model.js";

const EmailManager = {
    sendEmail: function (email_data) {
        MailGunModule.messages.create(domain, email_data);
    },

    // common essential emails

    sendAccountVerificationEmail: async function (user, verification) {
        const mail = {
            from: "verification@devsbunker.com",
            to: user.email,
            subject: "Account verification",
            html: generateVerificationEmailTemplate(user.username, verification.userId, verification.token),
        };

        return await MailGunModule.messages.create(domain, mail); 
    },
    // sends another verification email to a user only if there is already a verification document in the database
    resendAccountVerificationEmail: async function (user_id) {
        const verification = await UserVerification.findOne({ userId: user_id });
        const user = await User.findOne( { _id: user_id } );

        if (verification) {
            const mail = {
                from: "verification@devsbunker.com",
                to: user.email,
                subject: "Account verification",
                html: generateVerificationEmailTemplate(user.username, verification.userId, verification.token),
            };

            return await MailGunModule.messages.create(domain, mail); 
        } else {
            return {
                success: false,
                message: "Failed to resend verification",
            };
        }
    }
};

export default EmailManager;
