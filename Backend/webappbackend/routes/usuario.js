var express = require('express');

var router = express.Router();
/*router.get('/', function(req, res, next) {
    res.send('respond with a client');
});*/

var { crearUsuario, obtenerUsuario,login } = require('../controllers/usuariocontroller');

router.get('/me', obtenerUsuario); 
router.post('/login', login); 
router.post('/register', crearUsuario);

module.exports = router;