var express = require('express');
const cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const tareaRoutes = require('./routes/tarea'); 
const usuarioRoutes = require('./routes/usuario');

var app = express();

app.use(cors({
    origin: 'https://mfs-mod01-pf.vercel.app',  // Permite solicitudes desde tu frontend
    methods: 'GET,POST,PUT,DELETE',  // Métodos permitidos
    allowedHeaders: 'Content-Type, Authorization'  // Cabeceras permitidas
  }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/api/tasks', tareaRoutes);  
app.use('/api/auth', usuarioRoutes);
 

//const PORT = process.env.PORT || 3001;
//app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));

module.exports = app;
