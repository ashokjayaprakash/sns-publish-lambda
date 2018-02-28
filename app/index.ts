import {EmailNotificationHandler} from "./EmailNotificationHandler";

const blacklistEmail = new EmailNotificationHandler();

module.exports.emailNotification = blacklistEmail.handleAPIRequest;