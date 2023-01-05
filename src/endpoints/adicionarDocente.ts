import { Request, Response } from "express";
import knex from "knex";
import { Docente } from "../class/Docente";
import connection from "../database/connection";
import { TABLE_Docente } from "../dataBase/tableNames";
import { TB_Docente_Espec } from "../dataBase/tableNames";
import { TB_Especialidade } from "../dataBase/tableNames";

enum Espec {
    JS = "JS",
    CSS = "CSS", 
    React = "React",
    Typescript = "Typescript",
    POO = "POO"
};
export const addDocente =  async (req:Request, res:Response):Promise <void> =>{
    let codeError = 400;
    try{
        const {nome, email, data_nasc, turma_id} = req.body;
        const especialidade:string[] = req.body.especialidade;
        const id = Date.now().toString();
        
        // const newDocente = new Docente(id, nome, email, data_nasc, turma_id)
        // if(!id || !nome || !email || !data_nasc || !turma_id || !especialidade || especialidade.length < 1){
        //     codeError = 422;
        //     throw new Error("Dados faltando no Body");
        // } else if(typeof(especialidade) !== "object"){
        //     codeError = 409;
        //     throw new Error("Digite as especialidades em forma de array")
        // }
        await especialidade.forEach(async (espec) =>{
            const getEspec = await connection(TB_Especialidade).select().whereLike("nome",`${espec}`);

            if(getEspec[0] === undefined){
                codeError = 409;
                // throw new Error(`A especialidade ${espec} não é valida!`)
                res.status(codeError).send(`A especialidade ${espec} não é valida!`)
            } 
        })
      

        const listaEspecialidade = await connection(TB_Especialidade).select().whereLike("nome",`${especialidade}`);
        let newId = id + "00"
        // if(listaEspecialidade.length === 0){
        //     // await connection.insert({newId,especialidade}).into(TB_Especialidade);
        //     console.log("dentro do if",newId)
        // }

        // // await connection.insert({}).into(TB_Docente_Espec);
        // newId = newId + "01"
        // console.log("fora do if e depos dele",newId)
   
        // await connection.insert({id, nome, email, data_nasc, turma_id}).into(TABLE_Docente)
        
        res.status(200).send("Novo docente adicionado com sucesso!")  
         
    }catch(error:any){
        res.status(codeError).send(error.message)
    }
}

// const especialidades = await connection(TB_Especialidade).select().whereRaw(`nome = "${especialidade}"`);
// else if(especialidade !== Espec.CSS && especialidade !== Espec.JS && especialidade &&
//     Espec.React && especialidade !== Espec.Typescript && especialidade !== Espec.POO ){
//         codeError = 409;
//         throw new Error("Digite uma especialidade valida, CSS, JS, React, Typescript, POO")
//     }
    