const express = require("express");
const app = express();
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const Post = require('./models/Post.js')



//Config
    //Template Engine
        app.engine('handlebars', handlebars({defaultLayout: 'main'}))
        app.set('view engine', 'handlebars')
    // Body Parser
        app.use(bodyParser.urlencoded({extended: false}))
        app.use(bodyParser.json())

//Rotas
    app.get('/', function(req, res){
        Post.findAll({order: [['id', 'DESC']]}).then(function(posts){
            res.render(__dirname + '/views/layouts/home',{posts: posts})    
        })
        
    })

    app.get('/cad', function(req, res){
        res.render(__dirname + '/views/layouts/formulario')
    })

    app.post('/add', function(req, res){
        Post.create({
            titulo: req.body.titulo,
            conteudo: req.body.conteudo
        }).then(function(){
            res.redirect('/')
        }).catch(function(erro){
            res.send("Houve um erro: " + erro)
        })
    })

    app.get('/deletar/:id', function(req, res){
        Post.destroy({where: {'id': req.params.id}}).then(function(){
            res.redirect('/')
        }).catch(function(erro){
            res.send("Esta postagem não existe!")
        })
    })

    app.get('/edit/:id', function(req, res){
        Post.findByPk(req.params.id)
          .then(post => {
            res.render(__dirname + '/views/layouts/form-edit', {
              id: req.params.id,
              titulo: post.titulo,
              conteudo: post.conteudo
            })
          })
          .catch(err => {
            res.send('Post não encontrado!')
          })
      })
      app.post('/editado/:id', function(req, res){
        Post.update({
          titulo: req.body.titulo,
          conteudo: req.body.conteudo
        },
        {
          where: { id: req.params.id }
        }).then(function(){
          res.redirect('/')
        }).catch(function(err){
          console.log(err);
        })
      })

app.listen(3333, function(){
    console.log("Servidor Rodando na url http://localhost:3333");
})