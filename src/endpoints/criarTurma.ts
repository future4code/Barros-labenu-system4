import { Request, Response } from "express"
import { Turma } from "../class/Turma"
import connection from "../database/connection"
import { TABLE_Turma } from "../dataBase/tableNames";

export const criarTurma = async (req:Request, res:Response):Promise <void> =>{
    let codeError = 400;
    try{
        const { nome } = req.body
        const modulo = Number(req.body.modulo)
        const id = Date.now().toString()

        if(!nome || !modulo){
            codeError - 422;
            throw new Error("Informações faltando no body!");
        }else if(typeof(modulo) !== "number"){
            codeError - 409;
            throw new Error("Digite um numero no modulo da turma");
        }

        const novaTurma = new Turma(id, nome, modulo)
        const verificarTurma = await connection(TABLE_Turma).select();
        if(verificarTurma && verificarTurma[0].nome === nome){
            codeError = 409;
            throw new Error("Essa  Turma ja existe");
        }    
        await connection.insert(novaTurma).into(TABLE_Turma)
        res.status(200).send(`Turma ${nome} criada com sucesso...!`)
    }catch(error:any){
        res.status(codeError).send(error.message)
    }
}

