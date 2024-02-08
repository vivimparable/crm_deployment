const express = require('express')


const router = express.Router()

const clienteController = require('../controller/clienteController.js')
const productosController = require('../controller/productosController.js')
const pedidosController = require('../controller/pedidosController.js')
const userController =require('../controller/userControlller.js')

const auth = require('../middleware/auth.js')
module.exports = function(){

    //agregando nuevos clientes.

    router.post('/clientes',auth, clienteController.nuevoCliente)
    router.get('/clientes',  clienteController.getClientes)
    router.get('/clientes/:id',  clienteController.getClientesId)
    router.put('/clientes/:id',  clienteController.updateCliente)
    router.delete('/clientes/:id',  clienteController.clienteDelete)

    //agregando productos

    router.post('/productos',auth,productosController.subirArchivo,productosController.nuevoProducto )

    router.get('/productos',auth,productosController.mostrarProductos )
    router.get('/productos/:id', productosController.mostrarProductosId )
    router.put('/productos/:id',  productosController.subirArchivo,productosController.actualizarProductos)
    router.delete('/productos/:id',  productosController.eliminarProducto)
    router.post('/productos/busqueda/:id',  productosController.buscarProducto)


    //Pedidos
    
    router.post('/pedidos/:id',  pedidosController.añadirPedido )
    router.get('/pedidos',auth,pedidosController.mostrarPedido )
    router.get('/pedidos/:id',  pedidosController.mostrarPedidoId )
    router.put('/pedidos/:id',  pedidosController.actuPedidoId )
    router.delete('/pedidos/:id', pedidosController.deletePedidoId )

    //users
    router.post('/registro',userController.registroUser )
    router.post('/autenticar',userController.autenticarUser )
    return router 
}

   