const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.json([]);
});

// remove do app para poder integrar o jest com express
// app.listen(8080, () => {
//     console.log('start app');
// });
module.exports = app;
