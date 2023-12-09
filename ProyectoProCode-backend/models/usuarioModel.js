const mongoose = require('mongoose');

// Definición del esquema
const userSchema = new mongoose.Schema({
    
    usuario: {
        type: String,
        required: true,
    },
    correo: {
        type: String,
        unique: true,
        required: true,
        
    },
    password: {
        type: String,
        required: true,
    }
});


// Creamos modelo a partir del esquema
const Usuario = mongoose.model('Usuario', userSchema);

module.exports = Usuario; // Exportar el modelo para usarlo en otras partes del código