import { Request, Response } from "express";
import connection from "../database/connection";
import { TABLE_Estudante, TABLE_Turma } from "../class/tableNames";

export const alterarEstudanteTurma = async (req:Request, res:Response)=>{
    let codeError = 400;
    try{
        const TurmaId = req.body.TurmaId as string
        const {estudanteId} = req.params

        if(!TurmaId){
            codeError = 422;
            throw new Error("Digite o id da turma");
        } else if(estudanteId === ":estudanteId"){
            codeError = 422;
            throw new Error("Digite o id do estudante");
        };
        const verificarEstudante = await connection(TABLE_Estudante).select().where("id", estudanteId)
        const verificarTurma = await connection(TABLE_Turma).select().where("id",TurmaId)
        if(!verificarEstudante || verificarEstudante === undefined || verificarEstudante.length === 0){
            codeError = 409;
            throw new Error("id do estudante invalido ou inexistente!"); 
        };
        if(!verificarTurma || verificarTurma === undefined || verificarTurma.length === 0){
            codeError = 409;
            throw new Error("id da turma invalido ou a turma não existe!") 
        };
        
        await connection(TABLE_Estudante)
        .update({turma_id : TurmaId})
        .where("id",estudanteId)

        res.status(201).send(`O Estudante ${verificarEstudante[0].nome} foi alterado para a turma ${verificarTurma[0].nome} com sucesso...`)
    }catch(error:any){
        res.status(codeError).send(error.message)
    }
}