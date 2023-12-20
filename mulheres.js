const express = require("express")
const router = express.Router()

const app = express()
const porta = 3333

function mostrarPorta () {
    console.log("O servidor está na porta ", porta)
}

const mulheres = [
    {
        nome: 'Lais Victoria',
        imagem: 'https://media.licdn.com/dms/image/D4E03AQEX1zlrb4X7Uw/profile-displayphoto-shrink_400_400/0/1665001723539?e=1708560000&v=beta&t=JQV4zdYLjsCY5kuB_LOHRw_4FeBooyVbk-kiUGCj7-A',
        minibio: 'futura dev'
    },
    {
        nome: 'Iana Chan',
        imagem: 'https://media.licdn.com/dms/image/D4D03AQH94QQ7TrKasQ/profile-displayphoto-shrink_400_400/0/1686007268307?e=1708560000&v=beta&t=xdpXB4Py2OaB77uL-p8qk44gIOKOC52G7zEgq1isgwU',
        minibio: 'fundadora da programaria'
    },
    {
        nome: 'Ada Lovelace',
        imagem: 'https://s2.glbimg.com/paF5KTEVGzMU-ZcZa2mjYicNDjM=/e.glbimg.com/og/ed/f/original/2015/03/09/ada.jpg',
        minibio: 'Criadora do primeiro algoritmo da historia'
    }
]

function mostraMulheres(request, response) {
    response.json(mulheres)
}

app.use(router.get('/Mulheres', mostraMulheres))
app.listen(porta, mostrarPorta)