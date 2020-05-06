
class Tabelas {
    init(conexao) {
        this.conexao = conexao;
        this.verificaTabelaColaborador();
    }

    verificaTabelaColaborador() {

        const sql = 'CREATE TABLE IF NOT EXISTS Colaborador(id int NOT NULL AUTO_INCREMENT PRIMARY KEY,cargo varchar(30),Nome varchar(100) NOT NULL, dataNascimento date,  dataInsert datetime ); '

        this.conexao.query(sql, (erro) => {
            if (erro) {
                console.log(erro);
            }
            //else {
            //    console.log('Tabela Colaborador Criada com sucesso!');
            //}
        })


    }




}

module.exports = new Tabelas;