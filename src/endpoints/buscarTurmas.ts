import { Request, Response } from "express";
import connection from "../database/connection";
import { TABLE_Turma } from "../class/tableNames";


export const buscaTurmas = async (req: Request, res: Response):Promise <void> =>{
    try{
        const result = await connection(TABLE_Turma).select()
        res.status(200).send(result)

    }catch(error:any){
        res.status(500).send("Erro de servidor inesperado")
    }
}