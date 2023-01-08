import { Request, Response } from "express";
import connection from "../database/connection";
import { TABLE_Turma } from "../class/tableNames";

export const alterarModulo = async (req:Request, res:Response)=>{
    let codeError = 400;
    try{
        const novoModulo = Number(req.body.novoModulo)
        const {id} = req.params
        if(!novoModulo){
            codeError = 422;
            throw new Error("Digite o novo modulo da turma");
        } else if(typeof(novoModulo) !== "number"){
            codeError = 409;
            throw new Error("Digige o modulo em forma de numero")
        } else if(id === ":id"){
            codeError = 422;
            throw new Error("Digite o id da turma");
        };
        const verificarTurma = await connection(TABLE_Turma).select().where("id", id)
        if(!verificarTurma || verificarTurma === undefined || verificarTurma.length === 0){
            codeError = 409;
            throw new Error("id da turma invalido ou a turma não existe!")   
        }
        await connection(TABLE_Turma)
        .update({modulo : novoModulo})
        .select(id)
        
        res.status(201).send(`O modulo foi alterado para o módulo ${novoModulo} com sucesso...!`)

    }catch(error:any){
        res.status(codeError).send(error.message)
    }
}