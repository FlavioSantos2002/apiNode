const mongoose = require('mongoose')

async function main(){
    try{
        mongoose.set('strictQuery', true)
        await mongoose.connect('mongodb+srv://FlavioSantos:cnjvQFVYRnVCAWvV@cluster0.xmw5vjw.mongodb.net/?retryWrites=true&w=majority')
        console.log('conectado ao banco atlas')
    }catch(error){
        console.log('Erro: ' + error)
    }
    
}

module.exports = main