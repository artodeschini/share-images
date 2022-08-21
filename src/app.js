const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.json([]);
});

module.exports = app;
