const Marcas = require("../models/marca");

const { request, response } = require("express");


// Creacion de CRUD Marcas

/*
Crear Marcas
 */

const createMarcas = async (req = request, res = response) => {

    try {

        if (req.body.nombre.length < 3) {
            return res.status(400).json({ msg: 'Dato debe ser mayor a 3 caracteres!!' })
        }

        const data = { nombre: req.body.nombre.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "") };

        const marca = await Marcas.findOne(data)

        if (marca) {
            return res.status(400).json({ msg: 'Ya existe en la DB' })
        }

        const MarcaDB = new Marcas(data);
        MarcaDB.save();
        return res.status(200).json({ msg: 'Marca creada correctamente!!', MarcaDB});

    } catch (e) {
        return res.status(500).json({ Error: 'No se puede realizar la solicitud!!', e });
    }
}



/*
Consultar todos los documentos de la coleccion Marcas
*/

const getAllMarcas = async (req = request, res = response) => {
    try {
        
        const data = req.query;

        if (!data.estado) {
            const MarcasDB = await Marcas.find();
            return res.status(200).json({ MarcasDB })
        } else {
            const MarcasDB = await Marcas.find(data);
            return res.status(200).json({ MarcasDB })
        }

    } catch (e) {
        return res.status(500).json({ Error: 'No se puede realizar la solicitud!!', e });
    }
}



/*
Consultar un documento de Marcas por su ID
*/

const getMarcaByID = async (req = request, res = response) => {
    try {
        const id = req.params.id;
        const marcaDB = await Marcas.findById(id)

        if (!marcaDB) {
            return res.status(404).json({ Error: 'Error, Marca no encontrada!!' });
        }

        return res.status(200).json(marcaDB);

    } catch (e) {
        return res.status(500).json({ Error: 'No se puede realizar la solicitud!!', e });
    }
}


/*
Actualizar un documento de Marcas por su ID
*/

const updateMarcaByID = async (req = request, res = response) => {

    try {

        if (req.body.nombre) {
            req.body.nombre = req.body.nombre.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        }

        const id = req.params.id;
        const data = req.body;
        data.fecha_actualizacion = new Date();

        const Marca = await Marcas.findById(id);

        if (!Marca) {
            return res.status(404).json({ Error: "Error, Marca no encontrada!!" });
        }

        const MarcaDB = await Marcas.findByIdAndUpdate(id, data, { new: true });
        return res.status(201).json({ msg: "Actualizacion realizada correctamente!!", MarcaDB })

    } catch (e) {
        return res.status(500).json({ Error: 'No se puede realizar la solicitud!!', e });
    }
}


/*
Borrar un documento de Marcas por su ID
*/

const deleteMarcaByID = async (req = request, res = response) => {

    try {
        const id = req.params.id;
        const Marca = await Marcas.findById(id);
    
        if (!Marca) {
            return res.status(404).json({ error: "Error, Marca no encontrada!!" });
        }
    
        await Marcas.findByIdAndDelete(id);
        return res.status(200).json({ msg: "Operacion realizada con exito!!, se borró Marca:", Marca })

    } catch (e) {
        return res.status(500).json({ Error: 'No se puede realizar la solicitud!!', e });
    }
}

module.exports = { createMarcas, getAllMarcas, getMarcaByID, updateMarcaByID, deleteMarcaByID }