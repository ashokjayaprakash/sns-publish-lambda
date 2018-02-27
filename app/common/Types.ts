/*
* Type for Notification Response
*/
export interface Notification {
    header: NotificationHeader;
    message: NotificationMessage;
}

/*
* Type for Notification header
*/
export interface NotificationHeader {
    sourceIdentifier: string;
}

/*
* Type for Notification Response message
*/
export interface NotificationMessage {
    sourceTimestamp: string;
    email: Array<NotificationEmail>;
    placeholder: Object;
}

/*
* Type for Notification email information
*/
export interface NotificationEmail {
    toId: string;
    templateId: string;
}