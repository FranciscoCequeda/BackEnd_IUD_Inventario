const Inventario = require("../models/inventario");
const { request, response } = require("express");

const Estado = require("../models/estado");
const Marcas = require("../models/marca");
const TipoEquipo = require("../models/tipoEquipo");
const Usuarios = require("../models/usuario");

// Creacion de CRUD Inventario

/*
Crear Inventario
*/

const createInventario = async (req = request, res = response) => {

    try {

        const inventarioDB = await Inventario.findOne({ serial: req.body.serial })

        if (inventarioDB) {
            return res.status(400).json({ msg: 'Ya existe en la DB' })
        }

        if (req.body.serial && req.body.modelo) {
            req.body.serial = req.body.serial.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
            req.body.modelo = req.body.modelo.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        } else {
            return res.status(500).json({ Error: 'Error, Debe crear Serial y Modelo!!' });
        }

        if (req.body.descripcion) {
            req.body.descripcion = req.body.descripcion.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        }

        const data = req.body;

        const { marca, usuario, tipo_equipo, estado } = data;

        const marcaDB = await Marcas.findOne({ _id: marca._id, estado: true })
        const usuarioDB = await Usuarios.findOne({ _id: usuario._id, estado: true })
        const tipo_equipoDB = await TipoEquipo.findOne({ _id: tipo_equipo._id, estado: true })
        const estadoDB = await Estado.findOne({ _id: estado._id, estado: true })

        if (!marcaDB) {
            return res.status(404).json({ Error: 'Error, Marca Inactiva!!' });
        }

        if (!usuarioDB) {
            return res.status(404).json({ Error: 'Error, Usuario Inactivo!!' });
        }

        if (!tipo_equipoDB) {
            return res.status(404).json({ Error: 'Error, Tipo Equipo Inactivo!!' });
        }

        if (!estadoDB) {
            return res.status(404).json({ Error: 'Error, Estado Inactivo!!' });
        }

        const inventario = new Inventario(data);

        await inventario.save();
        return res.status(201).json({ msg: "Inventario creado correctamente!", inventario })

    } catch (e) {
        return res.status(500).json({ Error: 'No se puede realizar la solicitud!!', e });
    }

}

/*
Consultar todos los documentos de la coleccion Inventario
*/

const getAllInventario = async (req = request, res = response) => {

    try {

        const data = req.query

        if (!data.estado) {
            const inventarioDB = await Inventario.find().populate({ path: 'usuario' }).populate({ path: 'marca' }).populate({ path: 'estado' }).populate({ path: 'tipo_equipo' },);
            return res.json({ inventarioDB });
        } else {
            const inventarioDB = await Inventario.find(data);
            return res.json({ inventarioDB });
        }

    } catch (e) {
        return res.status(500).json({ Error: 'No se puede realizar la solicitud!!', e });
    }
}

/*
Consultar un documento de Inventario por su ID
*/

const getInventarioByID = async (req = request, res = response) => {
    try {

        const id = req.params.id;
        const inventarioDB = await Inventario.findById(id).populate({ path: 'usuario' }).populate({ path: 'marca' }).populate({ path: 'estado' }).populate({ path: 'tipo_equipo' },);;

        if (!inventarioDB) {
            return res.status(404).json({ Error: "Error, Inventario no encontrado!!" });
        };

        return res.status(200).json(inventarioDB)
    } catch (e) {
        return res.status(500).json({ Error: 'No se puede realizar la solicitud!!', e });
    }
}

/*
Actualizar un documento de Inventario por su ID
*/
const updateInventarioByID = async (req = request, res = response) => {
    try {

        const { id } = req.params;

        if (req.body.serial) {
            req.body.serial = req.body.serial.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        }

        if (req.body.modelo) {
            req.body.modelo = req.body.modelo.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        }

        if (req.body.descripcion) {
            req.body.descripcion = req.body.descripcion.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        }

        const data = req.body;

        const { marca, usuario, tipo_equipo, estado } = data;

        if (marca) {
            const marcaDB = await Marcas.findOne({ _id: marca._id, estado: true });

            if (!marcaDB) {
                return res.status(404).json({ Error: 'Error, Marca Inactiva!!' });
            }
        }

        if (usuario) {
            const usuarioDB = await Usuarios.findOne({ _id: usuario._id, estado: true })

            if (!usuarioDB) {
                return res.status(404).json({ Error: 'Error, Usuario Inactivo!!' });
            }
        }

        if (tipo_equipo) {
            const tipo_equipoDB = await TipoEquipo.findOne({ _id: tipo_equipo._id, estado: true })
            if (!tipo_equipoDB) {
                return res.status(404).json({ Error: 'Error, Tipo Equipo Inactivo!!' });
            }
        }

        if (estado) {
            const estadoDB = await Estado.findOne({ _id: estado._id, estado: true })

            if (!estadoDB) {
                return res.status(404).json({ Error: 'Error, Estado Inactivo!!' });
            }
        }

        const inventario = await Inventario.findByIdAndUpdate(id, data, { new: true });

        await inventario.save();
        return res.status(201).json({ msg: "Inventario actualizado correctamente!", inventario })

    } catch (e) {
        return res.status(500).json({ Error: 'No se puede realizar la solicitud!!', e });
    }
}


/*
Borrar un documento de Inventario por su ID
*/


/*
Subir foto por ID
*/

/*
consultar foto por ID
*/

module.exports = { createInventario, getAllInventario, getInventarioByID, updateInventarioByID }