const conexao = require('../infraestrutura/conexao');

class Cargo {

    adiciona(cargo, res) {

        const descricaoEhValida = (cargo.descricao).trim().length >= 3;

        const validacoes = [
            {
                nome: 'descricao',
                valido: descricaoEhValida,
                Mensagem: "Insira um cargo válido"
            }
        ];

        const erros = validacoes.filter(campo => !campo.valido);

        const ExistemErros = erros.length;

        if (ExistemErros) {
            res.status(400).json(erros);
        }

        else {
            const descricao = cargo.descricao.trim();

            const dadosInsert = { ...cargo, descricao };

            const sql = 'INSERT INTO Cargo SET ?';

            conexao.query(sql, dadosInsert, (erro, resultados) => {

                if (erro) {
                    res.status(400).json(erro);
                }
                else {
                    res.status(201).json({ ...cargo });
                }
            })


        }

    }

    lista(res) {
        const sql = 'SELECT * FROM listaCargo';

        conexao.query(sql, (erro, resultados) => {

            if (erro) {
                res.status(400).json(erro);
            }
            else {
                res.status(200).json(resultados);
            }
        })
    }

    buscaPorId(id, res) {

        const sql = `CALL buscaCargoPorId(${id})`;

        conexao.query(sql, (erro, resultados) => {

            const cargo = resultados[0];

            if (erro) {
                res.status(400).json(erro);
            }
            else {
                res.status(200).json(cargo);
            }
        })

    }

    altera(id, valores, res) {

        const sql = 'UPDATE Cargo SET ? WHERE id = ?';

        conexao.query(sql, [valores, id], (erro, resultados) => {

            if (erro) {
                res.status(400).json(erro);
            }
            else {
                res.status(201).json({ valores, id });
            }
        })
    }

    remove(id, res) {

        const sql = 'DELETE FROM Cargo WHERE id=?';

        conexao.query(sql, id, (erro, resultados) => {

            if (erro) {
                res.status(400).json(erro);
            }
            else {
                res.status(200).json({ id });
            }
        })
    }



}



module.exports = new Cargo;