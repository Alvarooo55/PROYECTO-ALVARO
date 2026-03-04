const Jugador = require('../models/jugador.model');
const mongoose = require('mongoose');
const jugadorCtrl = {};

//Funciones CRUD

// Obtener todas los jugadores FUNCIONA
jugadorCtrl.getJugadores = async (req, res) => {
    const jugadores = await Jugador.find()
        .then((data)=>res.status(200).json({status:data}))
        .catch((err)=>res.status(400).json({status:err}));
};

// Obtener un jugador por su ID  FUNCIONA 
jugadorCtrl.getJugador = async (req, res) => {
    // Obtener el id de la URL
    const { id } = req.params;

    // Verificar que el id exista
    if (!id) {
        return res.status(400).json({ status: 'El campo id no puede estar vacio' });
    }

    // Validar que sea un ObjectId válido de MongoDB
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ status: 'Jugador no encontrado' });
    }

    try {
        const data = await Jugador.findById(id);
        if (!data) {
            // no existía ningún jugador con ese id
            return res.status(404).json({ status: 'Jugador no encontrado' });
        }
        return res.status(200).json({ status: 'Jugador encontrado correctamente', data });
    } catch (err) {
        return res.status(400).json({ status: err });
    }
};

// Agregar un nuevo jugador   FUNCIONA 
jugadorCtrl.addJugador = async (req, res) => {
    const { nombre, equipo, temporadas, descripcion, goles, activo } = req.body;
    if (
        nombre == null || nombre === '' ||
        equipo == null || equipo === '' ||
        temporadas == null ||
        descripcion == null || descripcion === '' ||
        goles == null ||
        activo == null
    ) {
        return res.status(400).json({status: 'Faltan campos: nombre, equipo, temporadas, descripcion, goles o activo'});
    }

    try {
        // Verificar si ya existe un jugador con el mismo nombre
        const jugadorExistente = await Jugador.findOne({ nombre });
        if (jugadorExistente) {
            return res.status(400).json({status: 'Ya existe un jugador con ese nombre'});
        }

        const jugador = new Jugador({ nombre, equipo, temporadas, descripcion, goles, activo });
        const saved = await jugador.save();
        // enviamos el documento completo; incluirá createdAt/updatedAt automáticamente
        return res.status(200).json({status: 'Jugador agregado correctamente', data: saved});
    } catch (err) {
        return res.status(400).json({status: err});
    }
};

// Actualizar un jugador  FUNCIONA 
jugadorCtrl.updateJugador = async (req, res) => {
    // Obtener el id de la URL
    const { id } = req.params;

    // Verificar que el id exista
    if (!id) {
        return res.status(400).json({ status: 'El campo _id no puede estar vacio' });
    }

    // Validar que sea un ObjectId válido de MongoDB
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ status: 'Jugador no encontrado' });
    }

    // Desestructuramos los campos esperados en el body
    const {nombre, equipo, temporadas, descripcion, goles, activo } = req.body;

    // Verificar que los campos requeridos estén presentes
    if (
        nombre == null || nombre === '' ||
        equipo == null || equipo === '' ||
        temporadas == null ||
        descripcion == null || descripcion === '' ||
        goles == null ||
        activo == null
    ) {
        return res.status(400).json({ status: 'Faltan campos: nombre, equipo, temporadas, descripcion, goles o activo' });
    }

    const update = { nombre, equipo, temporadas, descripcion, goles, activo, updatedAt: Date.now() };
    try {
        const data = await Jugador.findByIdAndUpdate(id, update, { new: true });
        if (!data) {
            // no existía ningún jugador con ese id
            return res.status(404).json({ status: 'Jugador no encontrado' });
        }
        return res.status(200).json({ status: 'Jugador actualizado correctamente', data });
    } catch (err) {
        return res.status(400).json({ status: err });
    }
};

// Eliminar un jugador FUNCIONA
jugadorCtrl.deleteJugador = async (req, res) => {
    // Obtener el id de la URL
    const { id } = req.params;

    // Verificar que el id exista
    if (!id) {
        return res.status(400).json({ status: 'El campo id no puede estar vacio' });
    }

    // Validar que sea un ObjectId válido de MongoDB
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ status: 'Jugador no encontrado' });
    }

    try {
        const data = await Jugador.findByIdAndDelete(id);
        if (!data) {
            // no existía ningún documento con ese id
            return res.status(404).json({ status: 'Jugador no encontrado' });
        }
        return res.status(200).json({ status: 'Jugador eliminado correctamente' });
    } catch (err) {
        return res.status(400).json({ status: err });
    }
};

module.exports = jugadorCtrl;