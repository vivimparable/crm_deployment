const Clientes = require('../models/Clientes.js')

//agrgar nuevo cliente


exports.nuevoCliente = async (req,res,next)=>{

    console.log(req.body)
    const cliente = new Clientes(req.body);
   
    try {
            await cliente.save();
            res.json({mensaje:'Se agrego'})
    } catch (error) {
        console.log(error)
        res.send(error)
        next();
    }
    
}

exports.getClientes = async(req,res,next)=>{

    try {
        const clientes = await Clientes.find();
        res.json(clientes);
    } catch (error) {
        console.error('Error al obtener clientes:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }

}

exports.getClientesId = async(req,res,next)=>{
    console.log(req.params)

 try {
        const clientes = await Clientes.findById(req.params.id)
        res.json(clientes)

 } catch (error) {
        console.log(error)
 }

}


exports.updateCliente = async(req,res,next)=>{
    console.log(req.params)

 try {
        const clientes = await Clientes.findByIdAndUpdate({_id:req.params.id}
        ,
        req.body,{
            new:true
        })

        console.log(clientes)
        res.json({mensaje:'Se edito'})

 } catch (error) {
        console.log(error)
 }

}

exports.clienteDelete = async(req,res,next)=>{
    console.log(req.params)

 try {
        const clientes = await Clientes.findOneAndDelete({_id:req.params.id})

        res.json({mensaje:'Se eliminó'})

 } catch (error) {
        console.log(error)
 }

}