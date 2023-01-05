import { Request, Response } from "express";
import connection from "../database/connection";


export const buscaTurmas = async (req: Request, res: Response):Promise <void> =>{
    const result = await connection("Turma")
        .select()
    res.status(200).send(result)
}