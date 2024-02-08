const express = require('express')
const routes = require('./router/index.js')
const mongoose = require('mongoose')
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')

require('dotenv').config({path:'variables.env'})

//dominio

const whitelist = [process.env.FRONTENDURL]
const corsOptions={
  origin:(origin,callback)=>{
    const existe = whitelist.some( dominio => dominio === origin)
    if(existe){
      callback(null, true)
    }else{
      callback(new Error('No permitido por cors'))

    }
  }
}
//cors

app.use(cors());

//habilitarBodyPArser

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

//rutas de la app

app.use('/',routes())


//mongoose

mongoose.Promise = global.Promise

mongoose.connect(process.env.DBURL,{
    useNewUrlParser: true,
  useUnifiedTopology: true,
})



const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || '0.0.0.0'

app.use(express.static('uploads'))
app.listen(port, host, ()=>{
  console.log('funcionando!')
})

