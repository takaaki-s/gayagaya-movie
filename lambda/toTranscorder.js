"use strict";

var AWS = require("aws-sdk");

var transcoder = new AWS.ElasticTranscoder({
  apiVersion: "2012-09-25",
  region: "ap-northeast-1"
});

exports.handler = function(event, context) {
  var pipelineId = process.env.PIPELINE_ID;
  var presetId = process.env.PRESET_ID;

  var srcKey = decodeURIComponent(
    event.Records[0].s3.object.key.replace(/\+/g, " ")
  );
  var newKey = "output";
  var date_obj = new Date();

  var params = {
    PipelineId: pipelineId,
    OutputKeyPrefix: newKey + "/",
    Input: {
      Key: srcKey,
      FrameRate: "auto",
      Resolution: "auto",
      AspectRatio: "auto",
      Interlaced: "auto",
      Container: "auto"
    },
    Outputs: [
      {
        Key: date_obj.getTime() + ".gif",
        PresetId: presetId
      }
    ]
  };

  transcoder.createJob(params, function(err, data) {
    if (err) {
      console.log("Error");
    } else {
      console.log("Success");
    }
  });
};
