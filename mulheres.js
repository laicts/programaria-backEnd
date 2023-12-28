// Bloco de BIBLIOTECAS
const express = require("express") // iniciar o express
// const { v4: uuidv4 } = require('uuid');// biblioteca de id
const cors = require('cors') //aqui configura o pacote cors que permite consumir a api no front
//conectar com banco de dados
const conectaBancoDeDados = require('./bancoDeDados')
conectaBancoDeDados() //chamar a função do banco de dados

const Mulher = require('./mulherModels')

//configurar a primeira parte da rota
const router = express.Router()

// iniciar o app
const app = express()
app.use(express.json())
app.use(cors())

//criar a porta
const porta = 3333


//POST
async function criaMulher(request, response) {
    const novaMulher = new Mulher({
        nome: request.body.nome,
        imagem: request.body.imagem,
        minibio: request.body.minibio,
        citacao: request.body.citacao
    })
    try {
        const mulherCriada = await novaMulher.save()
        response.status(201).json(mulherCriada)
    } catch (erro) {
        console.log(erro)
    }
}

// PATCH
async function corrigeMulher (request, response) {
   try {
        const mulherEncontrada = await Mulher.findById(request.params.id)
        if(request.body.nome) {
            mulherEncontrada.nome  = request.body.nome
        }
        if(request.body.imagem) {
            mulherEncontrada.imagem  = request.body.imagem
        }
        if(request.body.minibio) {
            mulherEncontrada.minibio  = request.body.minibio
        }
        if (request.body.citacao) {
            mulherEncontrada.citacao = request.body.citacao
        }
        const mulherAtualizadaNoBancoDeDados = await mulherEncontrada.save()
        response.json(mulherAtualizadaNoBancoDeDados)
   } catch (erro) {
    console.log(erro)
   }
}

//GET
async function mostraMulheres(request, response) {
    try {
        const mulheresDoBancoDeDados = await Mulher.find()
        response.json(mulheresDoBancoDeDados)
        
    } catch (erro) {
        console.log(erro)
    }
}

//DELET
async function  excluiMulher(request, response) {
    try {
        await Mulher.findByIdAndDelete(request.params.id)
        response.json({message: 'Mulher deletada com sucesso'})
    } catch (erro) {
        console.log(erro)
    }
}

//porta
function mostrarPorta () {
    console.log("O servidor está rodando na porta ", porta)
}

app.use(router.get('/mulheres', mostraMulheres)) //configura rota GET/mulheres
app.use(router.post('/mulheres', criaMulher)) //configura rota POST/mulheres
app.use(router.patch('/mulheres/:id', corrigeMulher)) //configura a rota PATCH/mulheres/:id
app.use(router.delete('/mulheres/:id', excluiMulher)) //configura a rota DELET/mulheres/:id

app.listen(porta, mostrarPorta) //servidor ouvindo a porta