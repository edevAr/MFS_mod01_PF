var express = require('express');

var router = express.Router();
var autenticar  = require('../middleware/autenticar');

var { crearTarea, obtenerTareasDeUnUsuario, ObtenerUnaTarea, ActualizarUnaTarea, eliminarTarea } = require('../controllers/tareacontroller');

router.post('/', autenticar, crearTarea);
router.get('/', autenticar, obtenerTareasDeUnUsuario); 
router.get('/:id', autenticar, ObtenerUnaTarea); 
router.put('/:id', autenticar, ActualizarUnaTarea); 
router.delete('/:id', autenticar, eliminarTarea); 


module.exports = router;