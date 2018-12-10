const https = require('https');

module.exports = function (apiKey) {
    const options = ({
        data,
        params,
        method
    }) => ({
        hostname: 'brazilsouth.api.cognitive.microsoft.com',
        port: 443,
        path: `/vision/v1.0/analyze?visualFeatures=${params.join(',')}`,
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length,
            'Ocp-Apim-Subscription-Key': apiKey
        }
    });

    return (params = {}) => {
        /**
         * Params format example = {
         * data: {
         *   url: 'https://img.huffingtonpost.com/asset/5b7fdeab1900001d035028dc.jpeg?cache=sixpwrbb1s&ops=1910_1000'
         * },
         * method: 'GET' | 'POST' | 'PUT' | 'DELETE',
         * visualFeatures: ['Description', 'Adult'],
         * headers: {}
         * }
         */
        const data = JSON.stringify(params.data);
        const {
            method,
            visualFeatures
        } = params;
        return new Promise((resolve, reject) => {
            const req = https.request(options({
                data,
                method,
                params: visualFeatures
            }), (res) => {
                console.log(`statusCode: ${res.statusCode}`);
                res.on('data', (result) => {
                    console.log(result);
                    resolve(result);
                });
            });

            req.on('error', (error) => {
                console.error(error);
                reject(error);
            });

            req.write(data);
            req.end();
        });
    }
}