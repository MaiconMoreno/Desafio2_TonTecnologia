const moment = require('moment');
const conexao = require('../infraestrutura/conexao');
const verificaData = require('../utils/functions');


class Colaborador {

    adiciona(colaborador, res) {

        // conversao dos valores
        const idCargo = parseInt(colaborador.idCargo);
        const dataNascimento = moment(colaborador.dataNascimento, 'DD-MM-YYYY').format('DD/MM/YYYY');


        // checando os valores 
        const nomeEhValido = (colaborador.nome).trim().length >= 5;
        const dataNascEhValida = verificaData(dataNascimento)

        const nome = colaborador.nome.trim();

        // verificando se é número, o banco não vai deixar realizar o insert se o id do cargo não existir  
        // no frontEnd poderia fazer um get da lista de cargo e passar o parametro conforme selecionado
        const cargoEhValido = Number.isInteger(idCargo);

        // validando campos
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
            },
            {
                nome: 'dataNascimento',
                valido: dataNascEhValida,
                mensagem: `Data de Nascimento informado não é invalida: ${dataNascimento}`
            }

        ]

        const erros = validacoes.filter(campo => !campo.valido);

        const existemErros = erros.length;

        // retornar os erros se houver 
        if (existemErros) {
            res.status(400).json(erros);
        }
        else {

            const dataInsert = moment().format(); //new Date();


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

        valores.idCargo = parseInt(valores.idCargo);
        valores.dataNascimento = moment(valores.dataNascimento, 'DD-MM-YYYY').format('DD/MM/YYYY');

        // checando das um dos valores 
        const nomeEhValido = (valores.nome).trim().length >= 5;
        const dataNascEhValida = verificaData(valores.dataNascimento);
        const cargoEhValido = Number.isInteger(valores.idCargo);

        const validacoes = [
            {
                nome: 'nome',
                valido: nomeEhValido,
                mensagem: 'Insira um nome completo'
            },
            {
                nome: 'dataNascimento',
                valido: dataNascEhValida,
                mensagem: `Data de nascimento informada não é invalida: ${valores.dataNascimento}`,
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
            const nome = valores.nome.trim();
            const sql = 'UPDATE Colaborador SET ? WHERE id = ?';

            conexao.query(sql, [valores, id], (erro, resultados) => {

                if (erro) {
                    res.status(400).json(erro);
                } else {
                    res.status(201).json({ ...valores, nome, id });
                }
            })
        }
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