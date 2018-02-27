export const NOTIFICATION_TOPIC = process.env.NOTIFICATION_TOPIC || "";

export const INTERNAL_SERVER_ERROR = {
    statusCode: 500,
    body: JSON.stringify({code: 500, message: "Internal server error"} ) 
  };

export const BAD_REQUEST = {
    statusCode: 400,
    body: JSON.stringify({code: 400, message: "Bad Request"} ) 
};

export const UNSUPPORTED_MEDIA_TYPE = {
    statusCode: 415,
    body: JSON.stringify({code: 415, message: "Unsupported media type"} ) 
};

export const SUCCESS = {
    statusCode: 200,
    body: JSON.stringify({code: 200, message: "Email initiated successfully"} ) 
};