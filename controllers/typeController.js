const {Type} = require('../models/models')
const ApiError = require('../error/ApiError');

class TypeController {
    async create(req, res){
        const{name} = req.body
        const type = await Type.create({name})
        return res.json(type)
    }

    async getAll(req, res){
        const types = await Type.findAll()
        return res.json(types)
        

    }

    async getOne(req, res){
        const{id}=req.params
        const types = await Type.findAll(
            {
                where:{id}
                
            },

        )
        return res.json(types)

    }

    async destroy (req, res, next)  {
        try{
            const {id} = req.params 
            const FindTypeById = await Type.findByPk(id)
            if (!FindTypeById){
                res.status(404).json({
                    message: `type with id ${id} not found`
                })
            }
            const deleteType = FindTypeById.destroy()
            if (!deleteType){
                res.status(503).json({
                    message:`type with id ${id} failed delete`
                })
            }
            res.status(200).json({
                message:`type with ${id} deleted`
            })
        }catch (e){
            next(ApiError.badRequest(e.message))}   
    }

    async update (req, res, next){
        try{
            const {id} = req.params
            const {name} = req.body
            const FindTypeById = await Type.findOne({
                where: {
                    id
                }
            })
            if (!FindTypeById){
                res.status(400).json({
                    message: `type with id ${id} not found`
                })
            }
            if (name) FindTypeById.name = name
            const updateType = await FindTypeById.save()
            if(!updateType){
                res.status(400).json({
                    message:`data type with ${id} failed update`
                })
            }
            res.status(200).json({
                data: updateType
            })

        }catch (e){
            next(ApiError.badRequest(e.message))}   
    }

}

module.exports = new TypeController()