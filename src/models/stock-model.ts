import db from '../database/stock.json'
import {writeFile}  from "jsonfile"
import { randomUUID } from 'node:crypto';

export default abstract class StockModel{
    private static async writeDB(){
        return writeFile('src/database/stock.json', db)
    }

    static async getAll(){
        return db
    }

    static async getByName(descripcion:string){
        const consulta = descripcion.toLowerCase()

        return db.filter((stock)=>stock.descripcion.toLowerCase().includes((consulta).toLowerCase()))
    }
    static async getBycolor(color:string){
        const consulta = color.toLowerCase()

        return db.filter((stock)=>stock.color.toLowerCase().includes((consulta).toLowerCase()))
    }
    static async getByTalle(talle:string){
        const consulta = talle.toLowerCase()

        return db.filter((stock)=>stock.talle.toLowerCase().includes((consulta).toLowerCase()))
   }

    static async createStock(data: any) {

       const { descripcion , color, talle, cantidad, precio} = data;
       
        const id = randomUUID()

		const newStock = { descripcion,color ,talle ,cantidad,precio, id: id  };
		db.push(newStock)

        await this.writeDB();

		// En el caso de operación exitosa, sólo quiero devolver estos datos
		return  newStock
	}
    
    static async updateById(dataObj:any){
        const { descripcion,color,talle,cantidad,precio,id } = dataObj 
          const foundIdIndex= db.findIndex((stock)=>stock.id == id)
       if(foundIdIndex == -1)return {error:"ID doesn't exists in db"}

        const ropa = db[foundIdIndex];
       if(descripcion) ropa.descripcion = descripcion;
       if(color) ropa.color = color;
       if(talle) ropa.talle = talle;
       if(cantidad) ropa.cantidad = cantidad;
       if(precio) ropa.precio = precio;
   
       await this.writeDB()
        return{message: 'Updated successfully'}
        }

      static async deleteById(id:any){
        const foundIdIndex= db.findIndex((stock)=>stock.id == id)
          console.log(foundIdIndex)
        const stockToDelete= db[foundIdIndex]
        console.log(stockToDelete)
        if(foundIdIndex == -1)return {error:'id not found'}
         db.splice(foundIdIndex,1)
  
         await  writeFile('src/database/stock.json', db)
        return {message: 'Deleted successfully',ID: stockToDelete}   
        } 

}
 /* 
 console.log(StockModel.updateById("578d6d9d-1a2e-4227-ba85-0e503db7b4f3")) */
console.log(StockModel.deleteById("dsadasdda-234dfg-232dfg-4345-ssfsgfdf"))