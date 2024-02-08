const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const usuariosSchema =new Schema({

    nombre:{
        type:String,
        trim:true
    },
    email:{
        type:String,
        trim:true,
        unique:true,
        lowercase:true

    },password:{
        type:String,
        required:true
    }

});

module.exports = mongoose.model('Usuarios', usuariosSchema)