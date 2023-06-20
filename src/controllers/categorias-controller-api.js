const { request } = require('express');
const { miConexion} = require('../database/db');

const categoriasAPI = {};

categoriasAPI.getAll = async (req, res, next) => {
    try {
        const conexion = await miConexion();
        const [ rows ] = await conexion.query('SELECT * FROM categoria');
        if (rows.length > 0) {
            res.status(200).json({
                estado: 1,
                mensaje: "registros encontrados",
                categorias: rows
            })
        } else {
            res.status(404).json({
                estado:0,
                mensaje: "registros no encontrados",
                categorias: []
            })
        }
    } catch (error) {
        next (error);
    }
}

categoriasAPI.getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const conexion = await miConexion();
        const  [ rows ]  = await conexion.query('SELECT * FROM categoria WHERE id = ?', [ id ]);
        if(rows.length > 0){
            res.status(200).json({
                estado : 1,
                mensaje: "categoria encontrada",
                categoria: rows[0]
            })
        } else {
            res.status(404).json({
                estado: 0,
                mensaje: "categoria no encontrada",
                categoria: {}
            })
        }
    } catch (error) {
        next (error);
    }
}

categoriasAPI.deletebyId = async (req, res, next) => {
    try {
        const { id } = req.params;
        const conexion = await miConexion();
        const resultado = await conexion.query('DELETE FROM categoria WHERE id = ?', [ id ]);
        if(resultado[0].affectedRows>0){
            res.status(200).json({
                estado: 1,
                mensaje: "categoria eliminada"
            })
        } else {
            res.status(404).json({
                estado: 0,
                mensaje: "caetgoria no encontrada"
            })
        }
    } catch (error) {
        next (error);
    }
}

categoriasAPI.postNew = async (req, res, next) => {
    try{
        const { descripcion, observaciones } = req.body;
        if(descripcion == undefined || observaciones == undefined){
            res.status(400).json({
                estado: 0,
                mensaje: "Bad request, parameters missing"
            })
        } else {
            const conexion = await miConexion();
            const resultado = await conexion.query('INSERT INTO categoria (descripcion, observaciones) values (?, ?)', [ descripcion, observaciones])
            if(resultado[0].affectedRows>0){
                res.status(201).json({
                    estado: 1,
                    mensaje: "Categoria Creada",
                    categoria: {
                        id: resultado[0].insertId,
                        descripcion: descripcion,
                        observaciones: observaciones
                    }
                })
            } else {
                res.status(500).json({
                    estado: 0,
                    mensaje: "categoria no creada"
                })
            }
        }
        } catch (error) {
        next(error)
    }
}

categoriasAPI.putById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { descripcion, observaciones } = req.body;
        if(descripcion == undefined || observaciones == undefined){
            res.status(400).json({
                estado: 0,
                mensaje: 'Bad request, parameters missing'
            })
        } else {
            const conexion = await miConexion();
            const resultado = await conexion.query('UPDATE categoria SET descripcion = ?, observaciones = ? WHERE id = ?', [ descripcion, observaciones, id ]);
            if(resultado[0].afectedRows==0){
                res.status(404).json({
                    estado: 0,
                    mensaje: "Categoria no encontrada"
                })
                return;
            }

            if(resultado[0].changedRows==0){
                res.status(200).json({
                    resultado,
                    estado: 0,
                    mensaje: "Categoria sin cambios"
                })
                return;
            }

            res.status(200).json({
                estado: 1,
                mensaje: "Categoria Actalizada",
                categoria: {
                    id: id,
                    descripcion: descripcion,
                    observaciones: observaciones
                }
            })
            
        }
    } catch (error){
        next(error);
    }
}

module.exports=categoriasAPI;