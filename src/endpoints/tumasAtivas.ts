import { Request, Response } from "express";
import connection from "../database/connection";


export const turmasAtivas =  async (req:Request, res:Response):Promise <void> =>{
    const result = await connection("Turma")
    .select()
    .where('modulo', '>', 0)

    res.status(200).send(result)
}