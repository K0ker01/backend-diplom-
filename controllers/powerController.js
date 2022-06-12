const {Power} = require('../models/models')
const ApiError = require('../error/ApiError');

class PowerController {
    async create(req, res){
        const{name} = req.body
        const power = await Power.create({name})
        return res.json(power)
    }

    async getAll(req, res){
        const powers = await Power.findAll()
        return res.json(powers)
        

    }

    async getOne(req, res){
        try{
            const{id}=req.params
            const powers = await Power.findOne({where:{id}})
                if (!powers){
                    res.status(400).json({
                        message: `Power with id ${id} not found`
                    })
                }
            return res.json(powers)
        }catch(e){
            next(ApiError.badRequest(e.message))}
    }

    async destroy (req, res, next)  {
        try{
            const {id} = req.params 
            const FindPowerById = await Power.findByPk(id)
            if (!FindPowerById){
                res.status(404).json({
                    message: `Power with id ${id} not found`
                })
            }
            const deletePower = FindPowerById.destroy()
            if (!deletePower){
                res.status(503).json({
                    message:`Power with id ${id} failed delete`
                })
            }
            res.status(200).json({
                message:`Power with ${id} deleted`
            })
        }catch (e){
            next(ApiError.badRequest(e.message))}   
    }

    async update (req, res, next){
        try{
            const {id} = req.params
            const {name} = req.body
            const FindPowerById = await Power.findOne({
                where: {
                    id
                }
            })
            if (!FindPowerById){
                res.status(400).json({
                    message: `Power with id ${id} not found`
                })
            }
            if (name) FindPowerById.name = name
            const updatePower = await FindPowerById.save()
            if(!updatePower){
                res.status(400).json({
                    message:`data Power with ${id} failed update`
                })
            }
            res.status(200).json({
                data: updatePower
            })

        }catch (e){
            next(ApiError.badRequest(e.message))}   
    }

}

module.exports = new PowerController()