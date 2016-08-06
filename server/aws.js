const AWS = require('aws-sdk');
require('dotenv').config();
//

AWS.config.update({accessKeyId: process.env.accessKeyId, secretAccessKey: process.env.secretAccessKey});
AWS.config.update({region: 'us-west-2'});

//  endpoint to connect to postgres db nmodb.cqdxw6kmfwjk.us-west-2.rds.amazonaws.com:5432
