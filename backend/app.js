const express = require('express')
const cors = require('cors')
const app = express()


app.use(cors())
app.use(express.json())


//conexao com o banco
const conn = require('./db/conn')
conn();

const routes = require('./routes/router')
app.use("/api", routes)


app.listen(8081, ()=>{
    console.log('serv aberto com sucesso')
})

//banco --> s:cnjvQFVYRnVCAWvV -->u: FlavioSantos