const imService = require('../image-service');

module.exports = async function (context, req) {
    context.log('process started');
    const values = await imService.getAll(context);
    context.log('Values from storage: ', JSON.stringify(values));
    context.res = {
        body: values.entries
    };
};