const City = require('../models/City')
const database = require('../config/db');
const { Op } = require('sequelize');

module.exports = {
    async post(req, res) {
        try {
            await database.sync();

            const keys = Object.keys(req.body)

            for (key of keys) {
                if (req.body[key] == "") {
                    return res.send('Please, fill all fields!')
                }
            }

            const { nome, estado } = req.body

            let existCity = await City.findOne({ where: { nome: nome } })

            if (existCity === null) {
                const resultCreate = await City.create({
                    nome: nome,
                    estado: estado,
                })

                return res.json(resultCreate)
            } else {
                return res.json('This city has exist!')
            }

        } catch (error) {
            console.log(error);
        }

    },
    async search(req, res){
        try {
            await database.sync();

            const { nome, estado } = req.body   
            
            let resultSearch = await City.findAll( {
                where: { 
                    [Op.or]: [
                        {nome: nome === undefined ? "" : nome},
                        {estado: estado === undefined ? "" : estado}
                    ]
                }
            })

            if(resultSearch !== null){
                return res.json(resultSearch)
            }else{
                return res.status(404).send('City/State not found!')
            }
        } catch (error) {
            console.log(error)
        }
    }
}