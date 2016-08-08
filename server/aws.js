const AWS = require('aws-sdk');
require('dotenv').config();
//

AWS.config.update({accessKeyId: process.env.AWS_accessKeyId, secretAccessKey: process.env.AWS_secretAccessKey});
AWS.config.update({region: 'us-west-2'});

//  endpoint to connect to postgres db nmodb.cqdxw6kmfwjk.us-west-2.rds.amazonaws.com:5432

// var ec2 = new AWS.EC2({apiVersion: 'latest'});
