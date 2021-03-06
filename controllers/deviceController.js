const uuid = require('uuid')
const path = require ('path')
const {Device, DeviceInfo} = require('../models/models')
const ApiError = require ('../error/ApiError')

class DeviceController {
    async create(req, res, next){
        try{
            let {name, price, brandId, typeId, info, img} = req.body
            
         

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
            const device = await Device.create({name, price, brandId, typeId, img })

             return res.json(device)
        }catch(e){
            next(ApiError.badRequest(e.message))
        }
  
    }

    async getAll(req, res){
        const devices = await Device.findAll()
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
                    message: `device with id ${id} not found`
                })
            }
            const deleteDevice = FindDeviceById.destroy()
            if (!deleteDevice){
                res.status(503).json({
                    message:`device with id ${id} failed delete`
                })
            }
            res.status(200).json({
                message:`device with ${id} deleted`
            })
            return res.json(deleteDevice)
        }catch (e){
            next(ApiError.badRequest(e.message))}   
    }

    async update (req, res, next){
        try{
            const {id} = req.params
            const {name, price, brandId, typeId, info } = req.body
            const FindDeviceById = await Device.findOne({
                where: {
                    id
                }
            })
            if (!FindDeviceById){
                res.status(400).json({
                    message: `device with id ${id} not found`
                })
            }
            if (name) FindDeviceById.name = name
            if (price) FindDeviceById.price = price
            if (brandId) FindDeviceById.brandId = brandId
            if (typeId) FindDeviceById.typeId = typeId
            if (info) FindDeviceById.info = info
            const updateDevice = await FindDeviceById.save()
            if(!updateDevice){
                res.status(400).json({
                    message:`data device with ${id} failed update`
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