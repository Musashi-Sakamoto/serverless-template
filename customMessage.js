'use strict';

exports.handler = (event, context, callback) => {

    const response = {
        statusCode: 200,
        body: 'hello'
    };

    callback(null, response);
}