const { uuid } = require('uuidv4');
const Client = require('../models/Client')
const database = require('../config/db');
const { Op } = require('sequelize');
FormataStringData = require('../utils/format')

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

            const { name, gener, dt_birthday, age, city } = req.body

            const resultCreate = await Client.create({
                name: name,
                gener: gener,
                dt_birthday: FormataStringData(dt_birthday),
                age: age,
                city: city

            })

            return res.json(resultCreate)


        } catch (error) {
            console.log(error);
        }

    },
    async search(req, res) {
        try {
            await database.sync();

            const { id, name } = req.body

            let resultSearch = await Client.findAll({
                where: {
                    [Op.or]: [
                        { name: name === undefined ? "" : name },
                        { id: id === undefined ? "" : id }
                    ]
                }
            })


            if (resultSearch.length > 0) {
                return res.json(resultSearch)
            } else {
                return res.status(404).send('Client not found!')
            }
        } catch (error) {
            console.log(error)
        }
    },
    async update(req, res) {
        try {
            await database.sync();

            let { id, name } = req.body

            let resultUpdate = await Client.update(
                { name: name },
                { where: { id: id } }
            )


            if (resultUpdate[0] !== 0) {
                Client.findOne({ where: { id: id } })
                    .then(result => {
                        return res.status(202).json(result)
                    })
            } else {
                return res.status(404).send('Client not found!')
            }
        } catch (error) {

        }
    },
    async delete(req, res) {
        try {
            await database.sync();

            const { id } = req.body

            let resultDelete = await Client.destroy({ where: { id: id } })

            if (resultDelete === 1) {
                return res.status(202).send('Client deleted')
            } else {
                return res.status(404).send('Client not found!')
            }
        } catch (error) {

        }
    }

}