const uuid = require('uuid')
const path = require ('path')
const {Device, DeviceInfo} = require('../models/models')
const ApiError = require ('../error/ApiError')

class DeviceController {
    async create(req, res, next){
        try{
            let {name, price, oldprice, brandId, typeId, powerId, inventor, info} = req.body
            const {img}= req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const device = await Device.create({name, price, oldprice, brandId, typeId, powerId, inventor, img: fileName});
           

            if(info){
                info = JSON.parse(info)
                info.forEach(i =>
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                )
            }
             return res.json(device)
            } catch (e){
                next(e)}
  
    }

    async getAll(req, res) {
        let {brandId, typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let devices;
        if (!brandId && !typeId) {
            devices = await Device.findAndCountAll({limit, offset})
        }
        if (brandId && !typeId) {
            devices = await Device.findAndCountAll({where:{brandId}, limit, offset})
        }
        if (!brandId && typeId) {
            devices = await Device.findAndCountAll({where:{typeId}, limit, offset})
        }
        if (brandId && typeId) {
            devices = await Device.findAndCountAll({where:{typeId, brandId}, limit, offset})
        }
        return res.json(devices)
    }

    
    async getOne(req, res){
        const{id}=req.params
        const device = await Device.findAll(
            {
                where:{id},
                include:[{model:DeviceInfo, as:'info'}]
            },

        )
        return res.json(device)

    }

    async destroy (req, res, next)  {
        try{
            const {id} = req.params 
            const FindDeviceById = await Device.findByPk(id)
            if (!FindDeviceById){
                res.status(404).json({
                    message: `Device with id ${id} not found`
                })
            }
            const deleteDevice = FindDeviceById.destroy()
            if (!deleteDevice){
                res.status(503).json({
                    message:`Device with id ${id} failed delete`
                })
            }
            res.status(200).json({
                message:`Device with ${id} deleted`
            })
        }catch (e){
            next(ApiError.badRequest(e.message))}   
    }

    async update (req, res, next){
        try{
            const {id} = req.params
            const {name, price, oldprice, brandId, typeId, powerId, inventor, info } = req.body
            const FindDeviceById = await Device.findOne({
                where: {
                    id
                }
            })
            if (!FindDeviceById){
                res.status(400).json({
                    message: `Device with id ${id} not found`
                })
            }
            if (name) FindDeviceById.name = name
            if (price) FindDeviceById.price = price
            if (oldprice) FindDeviceById.oldprice = oldprice
            if (brandId) FindDeviceById.brandId = brandId
            if (typeId) FindDeviceById.typeId = typeId
            if (powerId) FindDeviceById.powerId = powerId
            if (inventor) FindDeviceById.inventor = inventor
            if (info) FindDeviceById.info = info
            const updateDevice = await FindDeviceById.save()
            if(!updateDevice){
                res.status(400).json({
                    message:`data Device with ${id} failed update`
                })
            }
            res.status(200).json({
                data: updateDevice
            })

        }catch (e){
            next(ApiError.badRequest(e.message))}   
    }

}

module.exports = new DeviceController()