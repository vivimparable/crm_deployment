const Usuarios = require('../models/Usuarios')
const bcrypt = require('bcrypt')
const jsonweb = require('jsonwebtoken')

exports.registroUser=async(req,res)=>{

    const user = new Usuarios(req.body);
    user.password = await bcrypt.hash(req.body.password,10);
    try {

        await user.save()
        res.json({mensaje:'user creado'})
        
    } catch (error) {
        console.log(error)
        res.json({mensaje:'error'})
    }

}

exports.autenticarUser = async (req, res, next)=>{
const {email, password} = req.body
const user = await Usuarios.findOne({email})
console.log('Usuario encontrado:', user);
console.log('Contraseña proporcionada:', password);
console.log('Contraseña almacenada en la base de datos:', user.password);
if(!user){
    await res.status(401).json({mensaje:'user no existe'})
    next()
}else{

    if(bcrypt.compareSync(password, user.password)){
        const token = jsonweb.sign({
            email:user.email,
            nombre:user.nombre,
            id:user._id
        }, 'LLAVESECRETA',{
             expiresIn:'2h'
        });


        res.json({token})
    }else{

        await res.status(401).json({mensaje:'password incorrecto'})
        return next()
        
    }

}

}