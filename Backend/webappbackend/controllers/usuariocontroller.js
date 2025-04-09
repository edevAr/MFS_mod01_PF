const {Usuario} = require('../models');
const bcrypt = require("bcryptjs"); 
const jwt = require("jsonwebtoken");

require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY;

    exports.crearUsuario = async (req, res) => 
    { 
        try {
            const { nombre, correo, contrasenia } = req.body;
        
            if (!nombre || !correo || !contrasenia) {
              return res.status(400).json({ msg: "Todos los campos son obligatorios" });
            }
            const usuarioExistente = await Usuario.findOne({ where: {correo} });
            console.log(usuarioExistente);
            if (usuarioExistente) {
              return res.status(400).json({ msg: "El usuario ya existe" });
            }
        
            const salt = await bcrypt.genSalt(10);
            const passwordHashed = await bcrypt.hash(contrasenia, salt);
        
            const nuevoUsuario = new Usuario({
              nombre,
              correo,
              contrasenia: passwordHashed,
            });
        
            await nuevoUsuario.save();
        
            res.status(201).json({ msg: "Usuario creado correctamente", usuario: nuevoUsuario });
          } catch (error) {
            console.error("Error al crear usuario:", error);
            res.status(500).json({ msg: "Hubo un error al crear el usuario" });
          }
    };
    exports.obtenerUsuario = async (req, res) => 
    { 
        try{
            const  id  = req.usuario.id;
            const user = await Usuario.findByPk(id);
            if(!user){
                return res.status(404).json({ mensaje: 'Usuario no encontrado' });
            }else{
                return res.status(200).json(user);
            }
        }catch(error){
            return res.status(500).json({ mensaje: 'Error al obtener usuario', error });
        }
    };
    exports.login = async (req, res) => 
    { 
        const { correo, contrasenia } = req.body;
        const user = await Usuario.findOne({
            where: {correo},
        });
        if (!user) return res.status(400).json({ message: "Usuario no encontrado" });
        const isMatch = await bcrypt.compare(contrasenia, user.contrasenia);
        if (!isMatch) return res.status(400).json({ message: "Contraseña incorrecta" });
        const token = jwt.sign(
        { 
            id: user.id,
            correo: user.correo 
        },
        SECRET_KEY,
        { 
            expiresIn: process.env.TOKEN_EXPIRATION || "1h" 
        } 
        );
        res.json({ token });
    };
    