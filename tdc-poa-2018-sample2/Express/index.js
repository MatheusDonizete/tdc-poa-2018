const { createHandler } = require('azure-function-express');
const { data } = require('./dictionary');
const fs = require('fs');

const express = require('express');

const app = express();

app.get('/api/:foo/:bar', (req, res) => {
    res.json({
        foo: req.params.foo,
        bar: req.params.bar
    });
});

app.get('/api/list', (req, res) => {
    res.json({
        status: true,
        data
    });
});

app.get('/api/static', (req, res) => {
    const html = fs.readFileSync(`${__dirname}/www/index.html`, 'utf-8');
    res.set('Content-Type', 'text/html');
    res.send(new Buffer(html));
});

module.exports = createHandler(app);