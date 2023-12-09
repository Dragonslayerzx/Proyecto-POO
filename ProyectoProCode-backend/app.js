// Importando modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const usersRoutes = require('./routes/usuariosRoutes');

const app = express();  //Construyendo aplicacion con express
const PORT = process.env.PORT || 3000; //Definiendo el puerto

//Usos del ebjeto app necesarios
app.use(cors());

app.use(
  express.urlencoded({
      extended: true
  })
)
app.use(
  express.json({
      type: "*/*"
}));

//middlewares (prefijo para accesar a las rutas)
app.use(express.json());
app.use('/api', usersRoutes);

//routes
app.get('/', (req, res)=> {
  res.send('Holaaa esta es la pagina de inicio');
});

// Conexión a la base de datos MongoDB con Mongoose
mongoose.connect('mongodb://localhost:27017/procode', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Verficar mediante consola la corecta conexion a mongo
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('Conexión exitosa a MongoDB SIUUU');
});

// Hacer que observe puerto definido y mandar mensaje a consola
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

