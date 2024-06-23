const mongoose = require('mongoose');
require('../config/db_mongo') // Conexión a BBDD MongoDB


const objectSchema = {
    company_name: { 
        type: String, 
        required: true,
        unique: true
    },
    CIF: { 
        type: String, 
        required: true,
        unique: true 
    },
    address: { 
        type: String, 
        required: true,
        unique: true
    },
    url_web: { 
        type: String, 
        required: true,
        unique: true
    }, 
    isActive: {
        type: Boolean,
        required: true,
    }
};

// Crear el esquema
const providerSchema = mongoose.Schema(objectSchema);
// Crear el modelo
const Provider = mongoose.model('Provider', providerSchema);

module.exports = Provider;


