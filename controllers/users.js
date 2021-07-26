const {request , response} = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require("bcryptjs");
const { validationResult } = require('express-validator');


const usuariosGet = (req = request, res = response) => {
    const { q, nombre, page, id } = req.query;

    res.json({
        ok: 'pacho',
        msg : 'get - controller',
        q,
        nombre,
        page,
        id

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
    
    
    
    res.json({
        msg: 'put API - usuariosput',
        usuario
    })
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

const usuariosDelete = (req, res = response) => {
    res.json({
        ok: 'pacho',
        msg : 'delete - controller'
    })
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