'use strict'

var AWS = require('aws-sdk')
var iotdata = new AWS.IotData({endpoint: process.env.IOT_ENDPOINT_HOST})

exports.handler = (event, context, callback) => {
    event.Records.forEach(record => {
        const payload = new Buffer(record.kinesis.data, 'base64').toString('ascii')
        const object = JSON.parse(payload)
        var params = {
            topic: 'message',
            payload: object.temperature.toString(),
            qos: 0
        }
        iotdata.publish(params, (err, data) => {
            if (err) {
                console.log(`Error occured: ${err}`)
            } else {
                console.log(`success: ${data}`)
            }
        })
    });
    callback(null, `publish: successfully processed ${event.Records.length} records`)
}