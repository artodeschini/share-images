const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.json([]);
});

app.get('/cor/:pessoa', (req, res) => {
    let pessoa = req.params.pessoa;

    if (pessoa == undefined) {
        res.json({cor: 'branco'});
    } else if (pessoa.toUpperCase() == 'ARTUR') {
        res.json({cor: 'azul'});
    } else if (pessoa.toUpperCase() == 'MANU') {
        res.json({cor: 'rosa'});
    } else if (pessoa.toUpperCase() == 'CATIA') {
        res.json({cor: 'vermelho'});
    } else {
        res.json({cor: 'blabla blabla'});
    }
});

// remove do app para poder integrar o jest com express
// app.listen(8080, () => {
//     console.log('start app');
// });
module.exports = app;
