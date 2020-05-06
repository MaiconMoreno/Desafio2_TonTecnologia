const Colaborador = require('../models/colaborador-model');

module.exports = app => {

    app.get('/colaborador', (req, res) => {
        Colaborador.lista(res)
    });

    app.get('/colaborador/:id', (req, res) => {

        const id = parseInt(req.params.id);

        Colaborador.buscaPorId(id, res);

    });


    app.post('/colaborador', (req, res) => {

        const colaboradorBody = req.body;

        Colaborador.adiciona(colaboradorBody, res);
    });


    app.put('/colaborador/:id', (req, res) => {

        const id = parseInt(req.params.id);

        const valores = req.body;

        Colaborador.altera(id, valores, res);
    })

    app.delete('/colaborador/:id', (req, res) => {

        const id = parseInt(req.params.id);

        Colaborador.remove(id, res);

    })

}