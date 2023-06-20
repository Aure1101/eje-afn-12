const express = require('express')
const categoriasController = require('../controllers/categorias-controller-api')
const router = express.Router();

router.get('/api/categorias', categoriasController.getAll);
router.get('/api/categorias/:id', categoriasController.getById);
router.delete('/api/categorias/:id', categoriasController.deletebyId);
router.post('/api/categorias', categoriasController.postNew);
router.put('/api/categorias/:id', categoriasController.putById);

module.exports=router