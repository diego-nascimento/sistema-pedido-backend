const routes = require('express').Router()
const multer = require('multer')
const multerconfig = require('./config/multerConfig')


const pedidoController = require('./controllers/pedidoController')
const produtoController = require('./controllers/produtosController')
const categoriaController = require('./controllers/categoriaController')
const fotoController = require('./controllers/fotoController')


routes.post('/produto', produtoController.store)
routes.get('/produtos/categoria', produtoController.show)
routes.delete('/produto', produtoController.destroy)

routes.post('/categoria', categoriaController.store)
routes.get('/categorias', categoriaController.show)

routes.post('/foto', multer(multerconfig).single('photo'),fotoController.store)

routes.post('/pedido', pedidoController.store)
routes.get('/pedidos', pedidoController.show)

module.exports = routes;