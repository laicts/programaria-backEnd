// Bloco de BIBLIOTECAS
const express = require("express") // iniciar o express
const { v4: uuidv4 } = require('uuid');// biblioteca de id

//conectar com banco de dados
const conectaBancoDeDados = require('./bancoDeDados')

conectaBancoDeDados() //chamar a função do banco de dados

//configurar a primeira parte da rota
const router = express.Router()

// iniciar o app
const app = express()
app.use(express.json())

//criar a porta
const porta = 3333

//lista inicial de mulheres
const mulheres = [
    {
        id:'1',
        nome: 'Lais Victoria',
        imagem: 'https://media.licdn.com/dms/image/D4E03AQEX1zlrb4X7Uw/profile-displayphoto-shrink_400_400/0/1665001723539?e=1708560000&v=beta&t=JQV4zdYLjsCY5kuB_LOHRw_4FeBooyVbk-kiUGCj7-A',
        minibio: 'futura dev'
    },
    {
        id:'2',
        nome: 'Iana Chan',
        imagem: 'https://media.licdn.com/dms/image/D4D03AQH94QQ7TrKasQ/profile-displayphoto-shrink_400_400/0/1686007268307?e=1708560000&v=beta&t=xdpXB4Py2OaB77uL-p8qk44gIOKOC52G7zEgq1isgwU',
        minibio: 'fundadora da programaria'
    },
    {
        id:'3',
        nome: 'Ada Lovelace',
        imagem: 'https://s2.glbimg.com/paF5KTEVGzMU-ZcZa2mjYicNDjM=/e.glbimg.com/og/ed/f/original/2015/03/09/ada.jpg',
        minibio: 'Criadora do primeiro algoritmo da historia'
    }
]

//POST
function criaMulher(request, response) {
    const novaMulher = {
        id: uuidv4(),
        nome: request.body.name,
        imagem: request.body.imagem,
        minibio: request.body.minibio
    }

    mulheres.push(novaMulher)

    response.json(mulheres)
}

// PATCH
function corrigeMulher (request, response) {
    function encontraMulher(mulher) {
        if(mulher.id === request.params.id) {
            return mulher
        }
    }
    const mulherEncontrada = mulheres.find(encontraMulher)

    if(request.body.nome) {
        mulherEncontrada.nome  = request.body.nome
    }
    if(request.body.imagem) {
        mulherEncontrada.imagem  = request.body.imagem
    }
    if(request.body.minibio) {
        mulherEncontrada.minibio  = request.body.minibio
    }

    response.json(mulheres)
}

//GET
function mostraMulheres(request, response) {
    response.json(mulheres)
}

//DELET
function  excluiMulher(request, response) {
    function todasMenosEla(mulher) {
        if (mulher.id !== request.params.id) {
            return mulher
        }
    }

    const mulheresQueFicam = mulheres.filter(todasMenosEla)

    response.json(mulheresQueFicam)
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