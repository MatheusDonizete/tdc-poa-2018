const azure = require('azure-storage');

const referenceObject = {
    PartitionKey: {
        '_': 'image'
    },
    RowKey: {
        '_': (+new Date()).toString()
    },
    description: {
        '_': ''
    },
    url: {
        '_': ''
    },
    dueDate: {
        '_': new Date()
    },
};

module.exports = {
    insert: (data) => {
        const values = Object.assign({}, referenceObject, data);
        const tableSvc = azure.createTableService(process.env.STORE_SECRET);

        return new Promise((resolve, reject) => {
            tableSvc.createTableIfNotExists('imagesmetadata', function (error, result, response) {
                if (!!error) {
                    reject(error);
                    return;
                }

                tableSvc.insertEntity('imagesmetadata', values, function (err, result, response) {
                    if (!!err) {
                        reject(err);
                        return;
                    }
                    console.log(result);
                    resolve(result);
                });
            });
        });
    },
    blobStore: (image) => {
        const blobService = azure.createBlobService(process.env.STORE_SECRET);
        return new Promise((resolve, reject) => {
            blobService.createBlockBlobFromStream('imagesdata', image.name, image.buffer, image.buffer.length, err => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve(true);
            });
        });

    },
    getAll: (context) => {
        const tableSvc = azure.createTableService(process.env.STORE_SECRET);

        return new Promise((resolve, reject) => {
            tableSvc.createTableIfNotExists('imagesmetadata', function (error, result, response) {
                if (!!error) {
                    reject(error);
                    return;
                }
                const query = new azure.TableQuery();
                tableSvc.queryEntities('imagesmetadata', query, null, function (error, result, response) {
                    if (!!error) {
                        reject(error);
                        return;
                    }

                    context.log(result);
                    resolve(result);
                });
            });
        });
    }
}