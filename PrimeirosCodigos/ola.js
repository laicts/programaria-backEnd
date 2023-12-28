const express = require("express")
const router = express.Router()

const app = express()
const porta = 3333

function mostraOla (request, response) {
    response.send("Olá, mundo")
}


function mostrarPorta () {
    console.log("O servidor está na porta ", porta)
}

app.use(router.get("/ola", mostraOla))
app.listen(porta, mostrarPorta)