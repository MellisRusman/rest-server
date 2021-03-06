const { Router } = require('express')

const { check } = require("express-validator")


const { validarCampos } = require('../middlewars/validar-campos')
const {esRoleExist, existeMail, esUsuarioMongo} = require('../helpers/db-validators')
 const {
    login
 } = require('../controllers/path')


const router = Router()

router.post('/login',[
    check('correo', 'El correo no es valido').isEmail(),
    check('password', 'El password no es valido').notEmpty(),
    validarCampos
], login )




module.exports = router
