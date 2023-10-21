import { Router } from 'express';
import StockController from "../controllers/stock-controller";

export const stockRouter = Router()

stockRouter.get('/',StockController.getAll)

stockRouter.get('/:descripcion',StockController.getbyName)

stockRouter.post('/',StockController.createStock)

stockRouter.patch('/:id',StockController.updateByID)

stockRouter.delete('/:id',StockController.deleteByID)

