
const Pedidos = require('../models/Pedidos')

exports.añadirPedido= async (req,res,next)=>{
    const pedido = new Pedidos(req.body)
    try {
        await pedido.save();
        res.json({mensaje:'Agregado'})
    } catch (error) {
        
    }
}

exports.mostrarPedido= async (req,res)=>{
    try {
            const todosPedidos = await Pedidos.find({}).populate('cliente').populate({
                path:'pedido.producto',
                model:'Productos'
            })
            res.json(todosPedidos)
    } catch (error) {
        console.log(error)
    }
}



exports.mostrarPedidoId= async (req,res)=>{
    try {
            const todosPedidos = await Pedidos.findById(
            req.params.id
            )
            res.json(todosPedidos)
    } catch (error) {
        console.log(error)
    }
}

exports.actuPedidoId= async (req,res)=>{
    try {
            const todosPedidos = await Pedidos.findByIdAndUpdate(
            {_id:req.paarams.id},
            req.body,{new:true}
            )
            res.json(todosPedidos)
    } catch (error) {
        console.log(error)
    }
}


exports.deletePedidoId= async (req,res)=>{
    try {
            const todosPedidos = await Pedidos.findByIdAndDelete({_id:req.params.id})
            res.json(todosPedidos)
    } catch (error) {
        console.log(error)
    }
}