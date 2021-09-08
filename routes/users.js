const { Router } = require('express')

const { check } = require("express-validator")


const {
    validarCampos,
    validarJWT,
    adminRole,
    tieneRole
} = require('../middlewars/')

const {esRoleExist, existeMail, esUsuarioMongo} = require('../helpers/db-validators')

const {
    usuariosGet,
    usuariosDelete,
    usuariosPut,
    usuariosPost,
    usuariosPatch
} = require ("../controllers/users")


const router = Router()

router.get('/', usuariosGet)

router.put('/:id',[
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(esUsuarioMongo),
    check('rol').custom( esRoleExist ),
    validarCampos
],usuariosPut )

router.post('/',[
    check('nombre', 'El nombre no es valido').notEmpty(),
    check('password', 'El password no es valido').isLength({min: 6 }),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(existeMail),
    check( 'rol').custom( esRoleExist ),
    validarCampos
], usuariosPost)


router.delete('/:id',[
    validarJWT,

    // El siguiente middleware permite eliminar solo a aquel que sea ADMIN_ROLE

    //adminRole,

    // Pero el siguiente middleware perimite eliminar a aquellos que sean 'ADMIN_ROLE', 'USER_ROLE', 'VENTAS_ROLE' o 'MANAGER_ROLE'

    tieneRole('ADMIN_ROLE', 'USER_ROLE', 'VENTAS_ROLE', 'MANAGER_ROLE'),
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(esUsuarioMongo),
    validarCampos
],usuariosDelete)



router.patch('/', usuariosPatch)




module.exports = router