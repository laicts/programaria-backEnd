const express = require("express")
const router = express.Router()

const app = express()
const porta = 3333

function mostraMulher(request, response) {
    response.json({
        nome: 'Lais Victoria',
        imagem: 'https://media.licdn.com/dms/image/D4E03AQEX1zlrb4X7Uw/profile-displayphoto-shrink_400_400/0/1665001723539?e=1708560000&v=beta&t=JQV4zdYLjsCY5kuB_LOHRw_4FeBooyVbk-kiUGCj7-A',
        minibio: 'futura dev'
    })
}

function mostrarPorta () {
    console.log("O servidor está na porta ", porta)
}

app.use(router.get('/Mulher', mostraMulher))
app.listen(porta, mostrarPorta)