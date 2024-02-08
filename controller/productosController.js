const Productos = require('../models/Productos');

const multer = require('multer');
const shortid = require('shortid');

const configuracionMulter = {
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname + '../../uploads/');
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req, file, cb) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error('Formato no válido'))
        }
    }
}

const upload = multer(configuracionMulter).single('imagen');

//subir archivo

exports.subirArchivo =(req,res,next)=>{

    upload(req,res, function(error){
        if(error){
            res.json({mensaje:error})
        }
        return next();
    })
}

//agrgar nuevo cliente


exports.nuevoProducto = async (req,res,next)=>{

    
    const productonuevo = new Productos(req.body);
   
    try {
        if(req.file.filename){
            productonuevo.imagen= req.file.filename
        }
            await productonuevo.save();
            res.json({mensaje:'Se agrego'})
    } catch (error) {
        console.log(error)
        next();
    }
    
}



exports.mostrarProductos = async (req,res,next)=>{

    try {
            const productos = await Productos.find();
             
            res.json(productos)
    } catch (error) {
        console.log(error)
        next();
    }
    
}

exports.mostrarProductosId = async (req, res, next) => {
    try {
        const producto = await Productos.findById(req.params.id);

        if (!producto) {
            res.json({ mensaje: 'Producto no encontrado' });
        } else {
            res.json(producto);
        }
    } catch (error) {
        console.error('Error al obtener producto por ID:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};


exports.actualizarProductos = async (req, res, next) => {

   

 
        const { id } = req.params;
    
        try {
            // Construir un nuevo producto
            let nuevoProducto = req.body;
    
            // Verificar si hay imagen nueva
            if (req.file) {
                nuevoProducto.imagen = req.file.filename;
            } else {
                let productoAnterior = await Productos.findById(id);
                nuevoProducto.imagen = productoAnterior.imagen;
            }
    
            let producto = await Productos.findOneAndUpdate({ _id: id },
                nuevoProducto, {
                new: true
            });
    
            res.json({
                producto,
                mensaje: 'Producto actualizado',
                
            });
        } catch (error) {
            console.log(error);
            next();
        }
    
};


exports.eliminarProducto = async (req,res,next)=>{

    try {
       
            await Productos.findByIdAndDelete({_id:req.params.id})
            res.json({mensaje:'Se eliminó'})
    } catch (error) {
        console.log(error)
        next();
    }
    
}

exports.buscarProducto=async(req,res,next)=>{
try {
    const {id}=req.params;
    const producto = await Productos.find({nombre: new RegExp(id,'i')})
    res.json(producto)
} catch (error) {
    console.log(error)
}
}