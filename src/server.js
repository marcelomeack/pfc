const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');
const app = express();

mongoose.connect('mongodb+srv://marcelo:marcelo@omni-nod4w.mongodb.net/teste?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

// req.query.parms = acessar query params (para filtros)
// req.params = acessar route params (para edição, delete) através de id por exemplo
// req.body = acessar corpo da requisição (criação edição)


app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..','uploads')));
app.use(routes);

app.listen(3333);