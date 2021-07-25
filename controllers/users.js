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

const usuariosPut = (req, res = response) => {
    const {id} = req.params
    res.json({
        ok: 'pacho',
        msg : 'put - controller',
        id
    })
    }

const usuariosPost = async(req, res = response) => {

    const errores = validationResult(req)
    if (!errores.isEmpty()){
        return res.status(400).json(errores)
    }
    const { nombre, correo, password, rol} = req.body
    const usuario = new Usuario({nombre, correo, password, rol})
    //verificar si el correo existe

    const existEmail = await Usuario.findOne({correo})
    if (existEmail){
        return res.status(400).json({
            msg : 'El correo ya existe'
        })
    }

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