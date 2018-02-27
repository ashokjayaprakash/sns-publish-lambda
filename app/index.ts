/* ---------------------------------------------------------------------------
   © 2017 HID Global Corporation/ASSA ABLOY AB.  All rights reserved.

   This program is an unpublished copyrighted work which is proprietary
   to HID Global. This computer program includes Confidential,
   Proprietary Information and is a Trade Secret of HID Global.
   Any use, disclosure, modification and/or reproduction is prohibited
   unless authorized in writing by HID Global.

   WARNING:  Unauthorized reproduction of this program as well as
   unauthorized preparation of derivative works based upon the
   program or distribution of copies by sale, rental, lease or
   lending are violations of federal copyright laws and state trade
   secret laws, punishable by civil and criminal penalties.
--------------------------------------------------------------------------- */

import {EmailNotificationHandler} from "./EmailNotificationHandler";

const blacklistEmail = new EmailNotificationHandler();

module.exports.emailNotification = blacklistEmail.handleAPIRequest;