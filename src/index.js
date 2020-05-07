
const customExpress = require('./config/customExpress');
const conexao = require('./infraestrutura/conexao');
const looger = require('..//src/utils/logger');

const app = customExpress();

//const tabelas = require('./infraestrutura/tabelas');


conexao.connect((erro => {

    if (erro) {
        console.log(erro);
    } else {
        console.log('Conectado com sucesso!')
        //tabelas.init(conexao);   
        const porta = 3000;

        app.listen(porta, () => looger.info(`Servidor online, rodando na porta ${porta}`));
    }
})
);


