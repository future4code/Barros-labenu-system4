import { Request, Response } from "express";
import connection from "../database/connection";

export const alterarEstudanteTurma = async (req:Request, res:Response)=>{

    const {novaTurma} = req.body
    const {id} = req.params

    await connection("Estudante")
    .update({turma_id : novaTurma})
    .select({id})
    
    res.status(201).send(`O estudante foi alterado de turma com sucesso...!`)
}