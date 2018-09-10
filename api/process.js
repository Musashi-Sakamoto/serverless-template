'use strict';

exports.handler = (event, context, callback) => {

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