const {Brand} = require('../models/models')
const ApiError = require('../error/ApiError')

class BrandController {
    async create(req, res){
        const{name} = req.body
        const brand = await Brand.create({name})
        return res.json(brand)

    }

    async getAll(req, res){
        const brands = await Brand.findAll()
        return res.json(brands)

    }

    async getOne(req, res){
        const{id}=req.params
        const brands = await Brand.findAll(
            {
                where:{id}
                
            },

        )
        return res.json(brands)

    }

    async destroy (req, res, next)  {
        try{
            const {id} = req.params 
            const FindBrandById = await Brand.findByPk(id)
            if (!FindBrandById){
                res.status(404).json({
                    message: `brand with id ${id} not found`
                })
            }
            const deleteBrand = FindBrandById.destroy()
            if (!deleteBrand){
                res.status(503).json({
                    message:`brand with id ${id} failed delete`
                })
            }
            res.status(200).json({
                message:`brand with ${id} deleted`
            })
            return res.json(deleteBrand)
        }catch (e){
            next(ApiError.badRequest(e.message))}   
    }

    async update (req, res, next){
        try{
            const {id} = req.params
            const {name} = req.body
            const FindBrandById = await Brand.findOne({
                where: {
                    id
                }
            })
            if (!FindBrandById){
                res.status(400).json({
                    message: `brand with id ${id} not found`
                })
            }
            if (name) FindBrandById.name = name
            const updateBrand = await FindBrandById.save()
            if(!updateBrand){
                res.status(400).json({
                    message:`data brand with ${id} failed update`
                })
            }
            res.status(200).json({
                data: updateBrand
            })

        }catch (e){
            next(ApiError.badRequest(e.message))}   
    }


}

module.exports = new BrandController()