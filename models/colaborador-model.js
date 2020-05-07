const moment = require('moment');

const conexao = require('../infraestrutura/conexao');

class Colaborador {

    adiciona(colaborador, res) {

        const idCargo = parseInt(colaborador.idCargo);
        const dataNascimento = moment(colaborador.dataNascimento, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
        const dataInsert = moment().format(); //new Date();

        const nomeEhValido = (colaborador.nome).trim().length >= 5;
        const cargoEhValido = Number.isInteger(idCargo);

        // criar validacao para dataNascimento !!

        const validacoes = [
            {
                nome: 'nome',
                valido: nomeEhValido,
                mensagem: 'Insira um nome completo'
            },
            {
                nome: 'idCargo',
                valido: cargoEhValido,
                mensagem: 'Insira um código de cargo válido'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido);

        const existemErros = erros.length;

        if (existemErros) {
            res.status(400).json(erros);
        }
        else {
            const nome = colaborador.nome.trim();

            const dadosInsert = { ...colaborador, nome, idCargo, dataNascimento, dataInsert };

            const sql = 'INSERT INTO Colaborador SET ?'

            conexao.query(sql, dadosInsert, (erro, resultados) => {

                if (erro) {
                    res.status(400).json(erro);
                } else {
                    res.status(201).json({ ...colaborador, ...resultados });
                }
            })
        }
    }

    lista(res) {

        const sql = 'SELECT * FROM listaColaborador';

        conexao.query(sql, (erro, resultados) => {

            if (erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json(resultados);
            }
        })
    }


    buscaPorId(id, res) {
        const sql = `CALL buscaColaboradorPorId(${id})`;

        conexao.query(sql, (erro, resultados) => {
            const colaborador = resultados[0];

            if (erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json(colaborador);
            }
        })
    }

    altera(id, valores, res) {

        if (valores.dataNascimento) {
            valores.dataNascimento = moment(valores.dataNascimento, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
        }

        const sql = 'UPDATE Colaborador SET ? WHERE id = ?';

        conexao.query(sql, [valores, id], (erro, resultados) => {

            if (erro) {
                res.status(400).json(erro);
            } else {
                res.status(201).json({ ...valores, id });
            }

        })
    }


    remove(id, res) {

        const sql = 'DELETE FROM Colaborador WHERE id=?';

        conexao.query(sql, id, (erro, resultados) => {

            if (erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json({ id });
            }
        })
    }


}


module.exports = new Colaborador;