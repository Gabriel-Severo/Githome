const express = require('express')
const server = express()
const axios = require('axios')
const db = require('./db')

server.use(express.static("public"))
server.use(express.urlencoded({extended: true}))

const nunjucks = require('nunjucks')
nunjucks.configure("views", {
    express: server,
    noCache: true
})

server.get("/", (req, res) => {
    return res.render("index.html")
})

server.get("/repositorios", async(req, res) => {
    let userInfo, repositories
    try{
        userInfo = await axios.get(`https://api.github.com/users/${req.query.usuario}`).then(response => response.data)
        repositories = await axios.get(`https://api.github.com/users/${req.query.usuario}/repos`).then(response => response.data)
    }catch(e){
        console.log(e)
        return res.render("notfound.html", {usuario: req.query.usuario});
    }
    let linguagens = {}

    // Obtem a linguagem mais usada pelo usuário
    repositories.forEach(repository => {
        if(repository.language == null)
            return;
        if(linguagens[repository.language]){
            linguagens[repository.language] += 1
        }else{
            linguagens[repository.language] = 1
        }
    })
    const linguagemUsada = Object.keys(linguagens).sort((a, b) => {
        if(linguagens[a] < linguagens[b]){
            return 1
        }
        if(linguagens[a] > linguagens[b]){
            return -1
        }
        return 0
    })[0]
    
    return res.render("repositorios.html", {userInfo, repositories, linguagemUsada})
})

server.get('/favoritos', (req, res) => {
    return res.render('favoritos.html')
})

server.listen(3000, () => {
    console.log("Servidor iniciado")
})