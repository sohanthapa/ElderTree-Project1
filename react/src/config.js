export default {
    MAX_ATTACHMENT_SIZE: 5000000,
    s3: {
      REGION: "us-east-2",
      BUCKET: "notes-elder-tree"
    },
    apiGateway: {
      REGION: "us-east-2",
      URL: "https://mp72qk8yz1.execute-api.us-east-2.amazonaws.com/prod"
    },
    cognito: {
      REGION: "us-east-2",
      USER_POOL_ID: "us-east-2_gGohB7cyT",
      APP_CLIENT_ID: "5abok4uqvsld57s8ra09dm18kt",
      IDENTITY_POOL_ID: "us-east-2:0c522b71-1ce8-4374-820f-f23f5e5c4941"
    }
    
  };  
  