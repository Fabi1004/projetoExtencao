// npm init
// npm install express --save
// npm install mysql2 --save
// npm install body-parser

// declaração de constantes para utilização
const mysql = require('mysql2')
const express = require('express')
const bodyParser = require('body-parser')

// Constante que recebe todas as funções da dependência express
const app = express();
// todos os arquivos estáticos devem constar na pasta public
app.use(express.static('public'))

const connection = mysql.createConnection({
  host: 'localhost',
  user:'root',
  password: 'root99',
  database:'controle_estoque'
})

connection.connect(function(err){
  if(err){
    console.error('Erro ', err)
  }console.log('Conexão estabelecida')
})
// Capturar os dados do formulário html
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

// Cria a função que "ouve" a porta do servidor
app.listen(8081,function(){
  console.log('Servidor rodando na url http://localhost:8081')
});

// Rota default
app.get('/',function(req, res){
  res.sendFile(__dirname+'/index.html')
})

// Rota Cadastro
app.get('/cadastroLogin',function(req, res){
  res.sendFile(__dirname+'/cadastro.html')
})

// Rota esqueci senha
app.get('/senha',function(req, res){
  res.sendFile(__dirname+'/public/html/senha.html')
})

// Rota menu
app.get('/menu',function(req, res){
  res.sendFile(__dirname+'/public/html/menu.html')
})

// Rota incio
app.get('/inicio',function(req, res){
  res.sendFile(__dirname+'/public/html/Crud/inicio.html')
})

// Rota Vagas
app.get('/vagas',function(req, res){
  res.sendFile(__dirname+'/public/html/Crud/vagas.html')
})

// Rota Cadastrar Usuario do sistema
app.post('/cadastroLogin',function(req, res){
  const nome = req.body.nome
  const sobrenome = req.body.sobrenome
  const email = req.body.email
  const telefone = req.body.telefone
  const endereco = req.body.endereco
  const nascimento = req.body.nascimento
  const senha = req.body.senha

  connection.query('INSERT INTO usuario(nome, sobrenome, telefone, endereco, nascimento, email, senha) VALUES(?,?,?,?,?,?)',[nome, sobrenome, telefone, endereco, nascimento, email,senha]
  , function(error,results,fields){
    if(error){
      console.error('Erro ao executar o cadastro ', error)
      res.status(500).send('Erro interno ao verificar campos inseridos. ')
      return
    }
  })
})

// Rota login
app.post('/login',function(req,res){
  const email = req.body.email
  const senha = req.body.senha

  connection.query('SELECT * FROM usuario WHERE email=? AND senha=?', [email,senha], function(error,results,fields){
    if(error){
      console.error('Erro ao executar a consulta ', error)
      res.status(500).send('Erro interno ao verificar credenciais. ')
      return
    }
    if(results.length > 0){
      res.redirect('/menu')
    }
    else{
      res.status(401).send('Credenciais inválidas')
    }
  })
})

// Rota Vagas
app.get('/vagas',function(req, res){
  const listar ="SELECT * FROM vagas"
  connection.query(listar,function(err,rows){
    if(!err){
      console.log('Dados inseridos com sucesso!')
      res.send(`
      
      `)
    } else{
      console.log("Erro", err);
      res.send("Erro")
    }
  })
})