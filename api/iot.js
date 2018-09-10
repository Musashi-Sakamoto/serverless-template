'use strict';
var AWS = require('aws-sdk'), dynamo = new AWS.DynamoDB.DocumentClient({
    region: "ap-northeast-1"
})
var uuid = require('uuid').v4

exports.handler = (event, context, callback) => {
    console.log(`iot: ${JSON.stringify(event)}`)
    dynamo.put({
        "TableName": process.env.DYNAMODB_TABLE,
        "Item": {
            "id": uuid(),
            "temperature": event.temperature.toString()
        }
    }, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            console.log('success')
        }
    })
    const response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
        },
        body: 'hello'
    };

    callback(null, response);
}