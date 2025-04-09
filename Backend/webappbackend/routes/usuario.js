var express = require('express');

var router = express.Router();
var autenticar  = require('../middleware/autenticar');


var { crearUsuario, obtenerUsuario,login } = require('../controllers/usuariocontroller');

router.get('/me', autenticar,obtenerUsuario); 
router.post('/login', login); 
router.post('/register', crearUsuario);

module.exports = router;