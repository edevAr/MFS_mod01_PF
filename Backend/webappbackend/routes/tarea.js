var express = require('express');

var router = express.Router();
/*router.get('/', function(req, res, next) {
    res.send('respond with a client');
});*/

var { crearTarea, obtenerTareasDeUnUsuario, ObtenerUnaTarea, ActualizarUnaTarea, eliminarTarea } = require('../controllers/tareacontroller');

router.post('/', crearTarea);
router.get('/', obtenerTareasDeUnUsuario); 
router.get('/:id', ObtenerUnaTarea); 
router.put('/:id', ActualizarUnaTarea); 
router.delete('/:id', eliminarTarea); 


module.exports = router;