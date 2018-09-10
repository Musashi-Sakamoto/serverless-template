'use strict';

var AWS = require('aws-sdk'), dynamo = new AWS.DynamoDB.DocumentClient({
    region: "ap-northeast-1"
})
var uuid = require('uuid').v4

exports.handler = (event, context, callback) => {
    event.Records.forEach(record => {
        const payload = new Buffer(record.kinesis.data, 'base64').toString('ascii')
        const object = JSON.parse(payload)
        console.log(`decoded payload: ${payload}`)
        dynamo.put({
            "TableName": process.env.DYNAMODB_TABLE,
            "Item": {
                "id": uuid(),
                "temperature": object.temperature.toString()
            }
        }, (err, data) => {
            if (err) {
                console.log(err)
            } else {
                console.log('yay')
            }
        })
    });
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