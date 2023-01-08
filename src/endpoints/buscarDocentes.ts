import { Request, Response } from "express";
import connection from "../database/connection";
import { TABLE_Docente } from "../dataBase/tableNames";


export const buscaDocente = async (req: Request, res: Response):Promise <void> =>{
    try{
        const result = await connection(TABLE_Docente).select()

        res.status(200).send(result)
    }catch(error:any){
        res.status(500).send("Erro de servidor inesperado")
    }
}