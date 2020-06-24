const express = require('express')
const server = express()
const axios = require('axios')

server.use(express.static("public"))
server.use(express.urlencoded({extended: true}))

const nunjucks = require('nunjucks')
const { default: Axios } = require('axios')
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
    return res.render("repositorios.html", {userInfo, repositories})
})

server.listen(3000, () => {
    console.log("Servidor iniciado")
})