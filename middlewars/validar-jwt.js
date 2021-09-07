const { request, response } = require('express')
const jwt = require('jsonwebtoken')

const validarJWT = (req = request, res = response, next) =>{
    const token = req.header('Authorization')
    if(!token){
        res.status(401).json({
            msg: 'No tiene permiso para accerder'
        })
    }
    try {
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY)

        req.uid = uid


        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({
            msg: 'Token no valido'
        })
    }


}

module.exports= {
    validarJWT
}