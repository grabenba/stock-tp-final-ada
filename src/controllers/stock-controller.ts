
import StockModel from "../models/stock-model"
//aca me traigo el tipo 
import { Request, Response } from "express"

class StockController {

    static async getAll(req: Request, res: Response) {
        const stock = await StockModel.getAll()
        res.status(200).json(stock);
    }

    static async getbyName(req: Request, res: Response) {
        const { descripcion } = req.params
        const nameFound = await StockModel.getByName(descripcion.toLowerCase())
        if (!nameFound) return res.status(404).json({ error: 'Error name not found' })
        res.status(200).json(nameFound);
    }

    static async createStock(req: Request, res: Response) {
        const { descripcion, color, talle, cantidad, precio } = req.body
        const stock = await StockModel.createStock({
            "descripcion": descripcion,
            "color": color,
            "talle": talle,
            "cantidad": cantidad,
            "precio": precio
        })
        res.status(201).json(stock);
    }

    static async deleteByID(req: Request, res: Response) {
        const { id } = req.params
        const stockDeleted = await StockModel.deleteById(id)
        if (stockDeleted.error)
            return res.status(404).json(stockDeleted);
        res.status(200).json(stockDeleted);
    }

    static async updateByID(req: Request, res: Response) {
        const { id } = req.params
        const { descripcion, color, talle, cantidad, precio } = await req.body
        const updatedStock = await StockModel.updateById({ descripcion, color, talle, cantidad, precio, id })
        res.status(201).json(updatedStock)
    }
}

export default StockController;








