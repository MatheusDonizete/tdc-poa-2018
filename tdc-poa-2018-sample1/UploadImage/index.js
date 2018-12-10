const blobStoreURL = process.env.BLOB_URL;
const imageService = require('../image-service');
const runner = require('../http-request');
const request = runner(process.env.COGNITIVE_SECRET);

module.exports = async function (context, req) {
    const isImageValid = await imageService.blobStore(req.body);
    if (!isImageValid) {
        context.res = {
            status: 400,
            body: 'Envie uma imagem Válida'
        };
        return;
    }

    const analyze = await request({
        method: 'POST',
        visualFeatures: ['Description', 'Adult'],
        data: {
            url: `${blobStoreURL}${req.body.name}`
        }
    });

    if (analyze.adult.isAdultContent) {
        context.res = {
            status: 400,
            body: 'Imagem recusada por conter conteúdo impróprio'
        };
        return;
    }

    imageService.insert({
        url: {
            '_': `${blobStoreURL}${req.body.name}`
        },
        description: {
            '_': analyze.description.captions[0].text
        },
    }).then(value => {
        context.res = {
            body: value
        }
    });
};