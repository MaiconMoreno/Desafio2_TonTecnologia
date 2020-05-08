
class Tabelas {
    init(conexao) {
        this.conexao = conexao;

        // não é mais necessário
        // this.verificarTabelaCargos
        //this.verificaTabelaColaborador();

    }
    verificarTabelaCargos() {

        const sql = 'CREATE TABLE IF NOT EXISTS Cargo(id int NOT NULL AUTO_INCREMENT PRIMARY KEY, descricao varchar(50) NOT null)';

        this.query(sql, (erro) => {
            if (erro) {
                console.log(erro);
            }
        })

    };


    verificaTabelaColaborador() {

        const sql = 'CREATE TABLE IF NOT EXISTS Colaborador(  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,   idCargo int NOT null,  nome varchar(100) NOT NULL,  dataNascimento date,  dataInsert datetime NOT NULL,  FOREIGN KEY (idCargo) REFERENCES Cargo(id))';

        this.conexao.query(sql, (erro) => {
            if (erro) {
                console.log(erro);
            }
        })
    }

}

module.exports = new Tabelas;