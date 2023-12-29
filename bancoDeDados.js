const mongoose = require('mongoose')
require('dotenv').config()

async function conectaBancoDeDados() {
    try {
        console.log("Conexão com o banco de dados iniciou")

        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            // Outras opções de conexão, se necessário
        });
    
        console.log("Conexão com banco de dados feita com sucesso")
    } catch(erro) {
        console.log(erro)
    }
}

module.exports = conectaBancoDeDados

