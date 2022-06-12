const { Inventor } = require("../models/models")

class InventorController {
    async create(req, res){
        const{name} = req.body
        const inventor = await Inventor.create({name})
        return res.json(inventor)
    }

    async destroy (req, res, next)  {
        try{
            const {id} = req.params 
            const FindInventorById = await Inventor.findByPk(id)
            if (!FindInventorById){
                res.status(404).json({
                    message: `Inventor with id ${id} not found`
                })
            }
            const deleteInventor = FindInventorById.destroy()
            if (!deleteInventor){
                res.status(503).json({
                    message:`Inventor with id ${id} failed delete`
                })
            }
            res.status(200).json({
                message:`Inventor with ${id} deleted`
            })
        }catch (e){
            next(ApiError.badRequest(e.message))}   
    }
}

module.exports = new InventorController()