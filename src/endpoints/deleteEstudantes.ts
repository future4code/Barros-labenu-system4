import { Request, Response } from "express";
import connection from "../database/connection";
import { TABLE_Estudante, TB_Estudantes_Hobby } from "../dataBase/tableNames";

export const deleteEstudante = async (req:Request, res:Response)=>{
    let codeError = 400;
    try{
        const {id} = req.params
        if(!id || id === ":id"){
            codeError = 422;
            throw new Error("Passe o id do usuario");
            
        }
        // procura se o estudante existe
        const procurarEstudante = await connection(TABLE_Estudante).select().where("id",id);
        
        if(!procurarEstudante && procurarEstudante[0] === undefined || procurarEstudante.length < 1){
            codeError = 409;
            throw new Error("Id de estudante invalido!")
        }

        // procura na tabela de hobbies de estudantes os hobbies do estudante e deleta de la
        const procurarHobbiesEstu = await connection(TB_Estudantes_Hobby).select("*").where("estudante_id",id);
        for(let i = 0; i < procurarHobbiesEstu.length; i++){
            await connection(TB_Estudantes_Hobby).delete().where("id",procurarHobbiesEstu[i].id)
            console.log(procurarHobbiesEstu[i])
        }
        // deleta o estudante
        await connection(TABLE_Estudante)
        .delete()
        .where({id})

        res.status(201).send(`O Estudante foi removido com sucesso...`)
    }catch(error:any){
        res.status(codeError).send(error.message)
    }
} 