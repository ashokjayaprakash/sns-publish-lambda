import * as AWS from "aws-sdk"; // must be npm installed to use
import {Notification, NotificationHeader, NotificationMessage, NotificationEmail} from "./common/Types";
import {NOTIFICATION_TOPIC, SOURCE_IDENTIFIER, INTERNAL_SERVER_ERROR, 
    SUCCESS, BAD_REQUEST, UNSUPPORTED_MEDIA_TYPE} from "./common/Constant";
        
export class EmailNotificationHandler {

    constructor() {}

    /**
     * To validate the environemt value for blacklist table and notification topic is available or not
     */
    private isValidEnvironmentAttribute = () => {
        const result = (!NOTIFICATION_TOPIC) ? false : true;
        return result;
    }

    private isValidHeader = (header: any) => {
        if(header && ( header["Content-Type"]  === "application/json" || header["content-type"]  === "application/json")) {
            return true;
        }
        return false;
    }

    /**
     * To validate the request payload
     */
    private isValidPayload = (payload: any) => {
        let validEmailObj = false;
        let validPlaceholder = false;
        payload = JSON.parse(payload);
        
        if(payload && payload.email && Array.isArray(payload.email)) {
            validEmailObj = true;
        }

        if(payload && payload.placeholder) {
            validPlaceholder = true;
        }

        if(validEmailObj && validPlaceholder) {
            return true;
        }
        return false;        
    }

    /**
     * To blacklist bounce email
     * @param event SNS event
     * @param context Lambda context
     * @param return callback 
     */
    handleAPIRequest = (event , context, callback) => {

        if(!event || !NOTIFICATION_TOPIC) {
            console.log("Not a valid event or SNS Topic not configured");
            return callback(null, INTERNAL_SERVER_ERROR);
        }

        if(!this.isValidHeader(event.headers)) {
            console.log("Invalid Header: ", event.headers);
            return callback(null, UNSUPPORTED_MEDIA_TYPE);
        }
            
        if(!this.isValidPayload(event.body)) {
            console.log("Invalid Payload: ", event.body);
            return callback(null, BAD_REQUEST);
        }

        try {
            const payload: any = JSON.parse(event.body);
            
            const messageToTopic: any = this.buildPayloadToSNS(payload.placeholder, payload.email);
            this.publishtoSNSTopic(messageToTopic);
            
            return callback(null, SUCCESS);
            
        } catch (error) {
            console.log("SNS Message parse error :-", error);            
            return callback(null, INTERNAL_SERVER_ERROR);
        }        
    };

    /*
    * To build message to publish SNS topic
    */
    buildPayloadToSNS = (message: any, email: any) => {
        const now = new Date();  
        const placeholder = message;
        let userToNotify: Array<NotificationEmail> = email

        let notificationMessage: NotificationMessage = {
            sourceTimestamp:now.toISOString(),
            email: userToNotify,
            placeholder
        }

        let notificationData: Notification = {
            header: {
                sourceIdentifier: SOURCE_IDENTIFIER
            },
            message: notificationMessage
        }
        
        return notificationData;    
    }

    /**
     * To publish message in SNS Topic
     * @param payload 
     */
    publishtoSNSTopic = (payload) => {
        let topicARN = NOTIFICATION_TOPIC;
        var sns = new AWS.SNS();
        var publishParams = {
            TopicArn: topicARN,
            Message: JSON.stringify(payload)
        };
        sns.publish(publishParams, (error, data) => {
            if (error) {
                console.log("publishtoSNSTopic:err", error);
            }
        });
    }
}