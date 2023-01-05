import { Request, Response } from "express";
import connection from "../database/connection";

export const deleteEstudante = async (req:Request, res:Response)=>{

    const {id} = req.params
    await connection("Estudante")
        .delete()
        .where({id})

    res.status(201).send(`O Estudante foi removido com sucesso...`)
} 