import { Request, Response } from "express";
import { Docente } from "../class/Docente";
import connection from "../database/connection";
import { TABLE_Docente } from "../class/tableNames";
import { TB_Docente_Espec } from "../class/tableNames";
import { TB_Especialidade } from "../class/tableNames";

export const addDocente =  async (req:Request, res:Response):Promise <void> =>{
    let codeError = 400;
    try{
        const {nome, email, data_nasc, turma_id} = req.body;
        const especialidade:string[] = req.body.especialidade;
        const id = Date.now().toString();
        
        
        if(!id || !nome || !email || !data_nasc || !turma_id || !especialidade || especialidade.length < 1){
            codeError = 422;
            throw new Error("Dados faltando no Body");
        } else if(typeof(especialidade) !== "object"){
            codeError = 409;
            throw new Error("Digite as especialidades em forma de array['JS']")
        };

        const newDocente = new Docente(id, nome, email, data_nasc, turma_id);

        // Verifica se o docente ja existe no banco de dados
        const getDocente = await connection(TABLE_Docente).select().where("email",email);
        if(getDocente && getDocente[0] !== undefined){
            if(email === getDocente[0].email || nome === getDocente[0].nome){
                codeError = 409;
                throw new Error("Este docente ja esta cadastrado!");
            }
        }
        //ABAIXO: Verifica se a especialidade existe;
        for(let i = 0; i < especialidade.length; i++){
            const getEspec = await connection(TB_Especialidade).select().where("nome",`${especialidade[i]}`);
        
            if(getEspec[0] === undefined){ 
                codeError = 409;
                throw new Error(`A especialidade ${especialidade[i]} não é valida!`);
            }
        };

        //ABAIXO: Cria o docente no banco de dados
        await connection.insert({id, nome, email, data_nasc, turma_id}).into(TABLE_Docente);

        //ABAIXO: faz a ligaçao do docente e a especialidade;
        await especialidade.forEach(async (espec) =>{
            const getEspec = await connection(TB_Especialidade).select().whereLike("nome",`${espec}`);
            let newId = id + Math.floor(Math.random() * 99);
            await connection.insert({id:newId, docente_id:id, especialidade_id:getEspec[0].id}).into(TB_Docente_Espec) 
            newId = newId + Math.floor(Math.random() - 5)
        });
        
        
        res.status(201).send("Novo docente adicionado com sucesso!")  
         
    }catch(error:any){
        res.status(codeError).send(error.message)
    }
}


    