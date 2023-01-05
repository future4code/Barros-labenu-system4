import { Request, Response } from "express";
import connection from "../database/connection";


export const buscaDocente = async (req: Request, res: Response):Promise <void> =>{
    const result = await connection("Docente")
        .select()
    res.status(200).send(result)
}