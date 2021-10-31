const express = require('express')

const CityController = require('./controllers/City')
const ClientController = require('./controllers/Client')

const routes = express.Router()

routes.post('/city', CityController.post)
routes.post('/city_search', CityController.search)
routes.post('/client', ClientController.post)
routes.post('/client_search', ClientController.search)
routes.post('/client_update', ClientController.update)
routes.post('/client_delete', ClientController.delete)

module.exports = routes