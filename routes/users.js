const { Router } = require('express')
const {
    usuariosGet,
    usuariosDelete,
    usuariosPut,
    usuariosPost,
    usuariosPatch
} = require ("../controllers/users")
const router = Router()
const { check } = require("express-validator")



router.get('/', usuariosGet)

router.put('/:id',usuariosPut )

router.post('/',[
    check('nombre', 'El nombre no es valido').notEmpty(),
    check('password', 'El password no es valido').isLength({min: 6 }),
    check('correo', 'El correo no es valido').isEmail(),
    check('rol', 'El rol no es valido').isIn(['ADMIN_ROLE', 'USER_ROLE'])
], usuariosPost)


router.delete('/', usuariosDelete)

router.patch('/', usuariosPatch)




module.exports = router