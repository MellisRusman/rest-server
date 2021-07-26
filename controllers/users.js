const {request , response} = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require("bcryptjs");
const { validationResult } = require('express-validator');


const usuariosGet = async(req = request, res = response) => {

    const {limite = 3, desde = 0} = req.query

    const [total , usuarios] = await Promise.all([
        Usuario.countDocuments({estado : true}),
        Usuario.find({estado : true})
            .skip(Number(desde))
            .limit(Number(limite))
    ])
    res.json({
        total,
        usuarios
    })

}

const usuariosPut = async(req , res = response) => {
    const {id} = req.params;
    const {_id, password, google,correo, ...resto} = req.body;
    if (password){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt)
    }


    const usuario = await Usuario.findByIdAndUpdate(id , resto)
    
    
    
    res.json(usuario)
}

const usuariosPost = async(req, res = response) => {

    const { nombre, correo, password, rol} = req.body
    const usuario = new Usuario({nombre, correo, password, rol})
    //verificar si el correo existe

    //encriptar la contrasena
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt)

    //guardar en DB
    await usuario.save()

    res.json({
        usuario
    })
    }

const usuariosDelete = async(req, res = response) => {

    const {id} = req.params

    //Borrado fisico

    //const usuario = await Usuario.findByIdAndDelete(id)

    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false})

    res.json({usuario})
}

const usuariosPatch = (req, res = response) => {
    res.json({
        ok: 'pacho',
        msg : 'patch - controller'
    })
    }


module.exports = {
    usuariosGet,
    usuariosDelete,
    usuariosPut,
    usuariosPost,
    usuariosPatch
}