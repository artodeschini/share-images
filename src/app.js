const express = require('express');
const app = express();
const mongoose = require('mongoose');
const router = require("./routes/routes");

mongoose.connect('mongodb://localhost:27017/pics').then(() => {
    console.log('Conectado ao MongoDB');
}).catch(error =>{
    console.log('Erro ao conectar ao MongoDB');
    console.log(error);
});

// bodyParser interno do express
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// rotas
app.use("/",router);

module.exports = app;
