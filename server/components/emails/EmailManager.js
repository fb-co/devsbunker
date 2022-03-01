import dotenv from "dotenv";
dotenv.config();

import MailGunModule from "../../config/Mailgun.js";
const domain = process.env.OUTBOUND_EMAIL_DOMAIN;

// email templates
import { generateVerificationEmailTemplate } from "../../templates/email.html.js";

// misc imports
import UserVerification from "../../components/user/verification.model.js";

const EmailManager = {
    sendEmail: async function (email_data) {
        return await MailGunModule.messages.create(domain, email_data);
    },

    
    // common essential emails

    sendAccountVerificationEmail: async function (user, verification) {
        const mail = {
            from: "verification@devsbunker.com",
            to: user.email,
            subject: "Account verification",
            html: generateVerificationEmailTemplate(user.username, verification.userId, verification.token),
        };

        return await this.sendEmail(mail);
    },
    // sends another verification email to a user only if there is already a verification document in the database
    resendAccountVerificationEmail: async function (user_id) {
        const verification = await UserVerification.findOne({ userId: user_id });

        if (verification) {
            const mail = {
                from: "verification@devsbunker.com",
                to: verification.corresponding_email,
                subject: "Account verification",
                html: generateVerificationEmailTemplate(verification.corresponding_username, verification.userId, verification.token),
            };

            return await this.sendEmail(mail);
        } else {
            return {
                success: false,
                message: "Failed to resend verification",
            };
        }
    }
};

export default EmailManager;
