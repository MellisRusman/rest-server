const {request , response} = require('express');

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

const usuariosPost = (req, res = response) => {
    const body = req.body
    res.json({
        ok: 'pacho',
        msg : 'post - controller',
        body
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