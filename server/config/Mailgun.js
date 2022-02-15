import dotenv from "dotenv";
dotenv.config();

import Mailgun from "mailgun.js";
import formData from "form-data";

const API_KEY = process.env.MAILGUN_API_KEY;

const MailGunObj = new Mailgun(formData);
const MailGun = MailGunObj.client({ username: 'api', key: API_KEY });

export default MailGun;

