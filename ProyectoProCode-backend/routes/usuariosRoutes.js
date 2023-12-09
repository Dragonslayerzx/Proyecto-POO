const express = require("express");
const userSchema = require("../models/usuarioModel");

const router = express.Router(); //creamos el enrutador

//Endpoints

//Creacion del usuario
router.post("/users", async (req, res) => {
  const { usuario, correo, password } = req.body;

  try {
    // Verificar si el correo electrónico ya existe en la base de datos
    const usuarioExistente = await userSchema.findOne({ correo });

    if (usuarioExistente) {
      return res.status(400).json({ message: 'El correo electrónico ya está registrado' });
    }

    // Si el correo electrónico no está registrado, se crea un nuevo usuario
    const nuevoUsuario = new userSchema({
      usuario,
      correo,
      password,
      // Otros campos del usuario...
    });

    // Guardar el nuevo usuario en la base de datos
    const usuarioGuardado = await nuevoUsuario.save();
    res.status(201).json(usuarioGuardado);
  } catch (error) {
    console.error('Error al guardar el usuario:', error);
    res.status(500).json({ message: 'Error al guardar el usuario' });
  }
});

//Obtener usuarios
router.get("/users", (req, res) => {
  userSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//Obtener un usuario
router.get("/users/:id", (req, res) => {
  const { id } = req.params;
  userSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//Actulizar un usuario
router.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { usuario, correo, password } = req.body;
  userSchema
    .updateOne({ _id: id }, { $set: { usuario, correo, password } }) //actualizar datos del objeto ID
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//Eliminar un usuario
router.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  userSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//Verificar datos de login
router.post('/users/login', async (req, res) => {
  const { correo, password } = req.body;

  try {
    // Buscar al usuario por correo en la base de datos
    const user = await userSchema.findOne({ correo });

    if (!user) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    // Verificar si la contraseña coincide
    if (user.password === password) {
      res.status(200).json({ message: 'Login exitoso',userId: user._id });
    } else {
      res.status(401).json({ message: 'Credenciales incorrectas' });
    }
  //almacenamos termporalmente el id
    usuarioSesion = user._id;

  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
});



//Actualizar informacion personal
router.put('/users/admin', async (req, res) => {
  // Obtiene los datos del usuario almacenados temporalmente
  const usuarioId = usuarioSesion.id;
  const { usuario, correo, password } = req.body;

  // Crear un objeto con los campos no vacíos que se desean actualizar
  const actualizacionUsuario = {};

  if (usuario !== undefined && usuario.trim() !== '') {
    actualizacionUsuario.usuario = usuario;
  }

  if (correo !== undefined && correo.trim() !== '') {
    actualizacionUsuario.correo = correo;
  }

  if (password !== undefined && password.trim() !== '') {
    actualizacionUsuario.password = password;
  }

  try {
    const usuarioActualizado = await userSchema.findByIdAndUpdate(usuarioId, actualizacionUsuario, { new: true });

    res.status(200).json({ message: 'Datos de usuario actualizados correctamente', usuario: usuarioActualizado });
  } catch (error) {
    console.error('Error al actualizar los datos del usuario:', error);
    res.status(500).json({ message: 'Error al actualizar los datos del usuario' });
  }
});

module.exports = router;