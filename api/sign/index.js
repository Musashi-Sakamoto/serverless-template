'use strict'

const v4 = require('aws-signature-v4')
const crypto = require('crypto')

//AWS IoT とブラウザ間でWebSocket通信を行うための署名つきURLを返すLambdaのコード
exports.handler = (event, context, callback) => {
    const url = v4.createPresignedURL(
        'GET',
        process.env.IOT_ENDPOINT_HOST.toLowerCase(),
        '/mqtt',
        'iotdevicegateway',
        crypto.createHash('sha256').update('', 'utf8').digest('hex'),
        {
            'protocol': 'wss',
            'region': process.env.IOT_AWS_REGION
        }
    )
    const response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
        },
        body: JSON.stringify({url: url})
    }
    callback(null, response)
}