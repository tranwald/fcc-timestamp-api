const express = require('express');
const app = express();

app.get('/home', (req, res) => {
    res.writeHeader(200, {
        'Content-Type': 'text/plain'
    });
    res.end('Hello World!');
}).listen(8080);