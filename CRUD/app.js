let http = require('http');

http.createServer(function(req,res){

        res.end("Ola mundo");


}).listen(3000);
console.log("Servidor Rodando!");