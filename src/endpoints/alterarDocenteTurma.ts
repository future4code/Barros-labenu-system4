import { Request, Response } from "express";
import connection from "../database/connection";
import { TABLE_Docente } from "../class/tableNames";
import { TABLE_Turma } from "../class/tableNames";

export const alterarDocenteTurma = async (req:Request, res:Response)=>{
    let codeError = 400;
    try{
        const TurmaId = req.body.TurmaId as string
        const {docenteId} = req.params

        if(!TurmaId){
            codeError = 422;
            throw new Error("Digite o id da turma");
        } else if(docenteId === ":docenteId"){
            codeError = 422;
            throw new Error("Digite o id do docente");
        };
        const verificarDocente = await connection(TABLE_Docente).select().where("id", docenteId)
        const verificarTurma = await connection(TABLE_Turma).select().where("id",TurmaId)
        if(!verificarDocente || verificarDocente === undefined || verificarDocente.length === 0){
            codeError = 409;
            throw new Error("id do docente invalido ou inexistente!"); 
        };
        if(!verificarTurma || verificarTurma === undefined || verificarTurma.length === 0){
            codeError = 409;
            throw new Error("id da turma invalido ou a turma não existe!") 
        };
        
        await connection(TABLE_Docente)
        .update({turma_id : TurmaId})
        .where("id",docenteId)

        res.status(201).send(`O docente ${verificarDocente[0].nome} foi alterado para a turma ${verificarTurma[0].nome} com sucesso...`)
    }catch(error:any){
        res.status(codeError).send(error.message)
    }
    
}