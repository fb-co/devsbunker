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
        const verification = await UserVerification.findOne({ userId: user_id, type: "verify" });

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
    },

    askForPasswordReset: async function (user, verification) {
        // send verification email
        const mail = {
            from: "password_reset@devsbunker.com",
            to: user.email,
            subject: "Password reset",
            html: `
                <p>To reset your password, follow this link: </p> 
                <a
                    href="${process.env.PROTOCOL}://${process.env.FRONTEND}:${process.env.CLIENTSIDE_PORT}/user/reset-password/exec/${verification.userId}/${verification.token}"
                    style="color: #067df7; text-decoration: none"
                    target="_blank"
                    >${process.env.PROTOCOL}://${process.env.FRONTEND}:${process.env.CLIENTSIDE_PORT}/user/reset-password/exec/${verification.userId}/${verification.token}</a
                >
            `,
        };

        return await this.sendEmail(mail);
    },

    resendAskForPasswordReset: async function (user_id) {
        const verification = await UserVerification.findOne({ userId: user_id, type: "reset_pwd" });

        if (verification) {
            const mail = {
                from: "password_reset@devsbunker.com",
                to: verification.corresponding_email,
                subject: "Password reset",
                html: `
                    <p>To reset your password, follow this link: </p> 
                    <a
                        href="${process.env.PROTOCOL}://${process.env.FRONTEND}:${process.env.CLIENTSIDE_PORT}/user/reset-password/exec/${verification.userId}/${verification.token}"
                        style="color: #067df7; text-decoration: none"
                        target="_blank"
                        >${process.env.PROTOCOL}://${process.env.FRONTEND}:${process.env.CLIENTSIDE_PORT}/user/reset-password/exec/${verification.userId}/${verification.token}</a
                    >
                `,
            };

            return await this.sendEmail(mail);
        } else {
            return {
                success: false,
                message: "Failed to resend verification",
            };
        }
    },
};

export default EmailManager;
