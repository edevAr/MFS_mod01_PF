const {Tarea} = require('../models');
    
    exports.crearTarea = async (req, res) => 
    { 
        const tarea = await Tarea.create(req.body); 
        res.status(201).json(tarea);
    };
    exports.obtenerTareasDeUnUsuario = async (req, res) => 
    { 
        const { userId } = req.params;
        const tareas = await Tarea.findByFk(userId); 
        res.json(tareas);
    };
    exports.ObtenerUnaTarea = async (req, res) => 
        { 
            const { id } = req.params;
            const tareas = await Tarea.findByPk(id); 
            res.json(tareas);
        };
    exports.ActualizarUnaTarea = async (req, res) => 
    { 
        try {
            const { id } = req.params;
        
            const [updated] = await Tarea.update(req.body, {
              where: { id }
            });
        
            if (updated) {
              const tareaActualizada = await Tarea.findByPk(id);
              console.log("actualizado");
              res.status(200).json(tareaActualizada);
            } else {
                console.log("no actualizado");
              res.status(404).json({ mensaje: 'Tarea no encontrado' });
            }
          } catch (error) {
            console.error('Error al actualizar la tarea:', error);
            res.status(500).json({ mensaje: 'Error del servidor' });
        }
    };
    exports.eliminarTarea = async (req, res) => 
    { 
        try {
            const { id } = req.params;
        
            // Buscar si la tarea existe
            const tarea = await Tarea.findByPk(id);
        
            if (!tarea) {
              return res.status(404).json({ mensaje: 'Tarea no encontrado' });
            }
        
            // Eliminar la tarea
            await tarea.destroy();
        
            res.status(200).json({ mensaje: 'Tarea eliminada exitosamente' });
          } catch (error) {
            console.error('Error al eliminar la tarea:', error);
            res.status(500).json({ mensaje: 'Error del servidor' });
          }
    };