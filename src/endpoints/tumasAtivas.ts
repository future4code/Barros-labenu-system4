import { Request, Response } from "express";
import connection from "../database/connection";
import { TABLE_Turma } from "../dataBase/tableNames";


export const turmasAtivas =  async (req:Request, res:Response):Promise <void> =>{
    let errorCode = 400;
    try{
        const result = await connection(TABLE_Turma)
        .select()
        .where('modulo', '>', 0)

    res.status(200).send(result)
    }catch(error:any){

    }
}