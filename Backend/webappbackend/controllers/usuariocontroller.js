const {Usuario} = require('../models');

    exports.crearUsuario = async (req, res) => 
    { 
        const usuario = await Usuario.create(req.body); 
        res.status(201).json(usuario);
    };
    exports.obtenerUsuario = async (req, res) => 
    { 
        const { id } = req.params;
        const usuario = await Usuario.findByPk(id); 
        res.json(usuario);
    };
    exports.login = async (req, res) => 
    { 
            
    };
    