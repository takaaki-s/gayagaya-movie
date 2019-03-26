"use strict";

const AWS = require("aws-sdk");

exports.handler = async event => {
  console.log("function start");

  if (event.Records[0].s3.object.key.match(/^output\/.*?/) == null) {
    console.log("other object.");
    return {
      statusCode: 200,
      body: ""
    };
  }

  const iotData = new AWS.IotData({
    apiVersion: "2015-05-28",
    endpoint: process.env.IOT_ENDPOINT
  });

  const params = {
    topic: process.env.TOPIC_NAME,
    payload: `${event.Records[0].s3.bucket.name}/${
      event.Records[0].s3.object.key
    }`,
    qos: 0
  };

  const res = await iotData.publish(params).promise();
  console.log(res);
  console.log("publish complite.");

  return {
    statusCode: 200,
    body: ""
  };
};
