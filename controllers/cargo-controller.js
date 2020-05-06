const Cargo = require('../models/cargo-model');

module.exports = app => {

    app.get('/cargo', (req, res) => {
        Cargo.lista(res);
    });

    app.get('/cargo/:id', (req, res) => {

        const id = parseInt(req.params.id);

        Cargo.buscaPorId(id, res);

    })

    app.post('/cargo', (req, res) => {

        const cargoBody = req.body;

        Cargo.adiciona(cargoBody, res);
    });

    app.put('/cargo/:id', (req, res) => {

        const id = parseInt(req.params.id);

        const valores = req.body;

        Cargo.altera(id, valores, res);
    })

    app.delete('/cargo/:id', (req, res) => {

        const id = parseInt(req.params.id);

        Cargo.remove(id, res);
    })

}