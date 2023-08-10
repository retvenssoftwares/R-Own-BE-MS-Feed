const AWS = require('aws-sdk');
// Configure AWS SDK with Amazon s3 Spaces credentials
;
// Configure AWS
AWS.config.update({
  accessKeyId: 'AKIARGO75B4MAVCFEQO5',
  secretAccessKey: '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',
  region: 'ap-south-1'
});

const s3 = new AWS.S3();
module.exports = s3;