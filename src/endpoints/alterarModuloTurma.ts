import { Request, Response } from "express";
import connection from "../database/connection";

export const alterarModulo = async (req:Request, res:Response)=>{

    const {novoModulo} = req.body
    const {id} = req.params

    await connection("Turma")
    .update({modulo : novoModulo})
    .select({id})
    
    res.status(201).send(`O modulo foi alterado para o módulo ${novoModulo} com sucesso...!`)
}