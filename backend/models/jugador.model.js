const mongoose = require('mongoose');
const {Schema} = require("mongoose");


const jugadoresSchema = new Schema({
        nombre: {type: String, required: true},
        equipo: {type: String, required: true},
        temporadas: {type: Number, required: true},
        descripcion: {type: String, required: true},
        goles: {type: Number, required: true},
        activo: {type: Boolean, required: true}
    },
    {
        versionKey: false,
        timestamps: true      // agrega createdAt y updatedAt automáticamente
    }
    );

module.exports = mongoose.model('Jugadores', jugadoresSchema, 'jugadores2026');