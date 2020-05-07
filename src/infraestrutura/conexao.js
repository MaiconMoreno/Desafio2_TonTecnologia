const mysql = require('mysql');

const conexao = mysql.createConnection({
    host: 'mysql.cabananova.com.br',
    port: 3306,
    user: 'cabananova01',
    password: 'DesafioTon2020',
    database: 'cabananova01'
})

module.exports = conexao;