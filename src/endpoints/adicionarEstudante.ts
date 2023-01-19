import { Request, Response } from "express"
import { Estudante } from "../class/Estudante"
import connection from "../database/connection"
import { TABLE_Estudante, TB_Estudantes_Hobby, TB_HobbiesName } from "../class/tableNames";

export const addEstudante =  async (req:Request, res:Response):Promise <void> =>{
    let codeError = 400;
    try{
        const { nome, email, data_nasc, turma_id} = req.body;
        const hobbies:string[] = req.body.hobbies;
        const id = Date.now().toString();

        if(!id || !nome || !email || !data_nasc || !turma_id || !hobbies || hobbies.length < 1){
            codeError = 422;
            throw new Error("Dados faltando no Body");
        } else if(typeof(hobbies) !== "object"){
            codeError = 409;
            throw new Error("Digite os hobbies em forma de array ex: hobbies: [ 'Assistir' ]")
        };
        const novoEstudante = new Estudante(id, nome, email, data_nasc, turma_id)

         // Verifica se o estudante ja existe no banco de dados
        const procurarEstudante = await connection(TABLE_Estudante).select().where("email",email);
        if(procurarEstudante && procurarEstudante[0] !== undefined){
            if(email === procurarEstudante[0].email || nome === procurarEstudante[0].nome){
                codeError = 409;
                throw new Error("Este Estudante ja esta cadastrado!");
            }
        };
        
        
        //ABAIXO: Verifica se o hooby existe e caso exista ou não, adiciona e faz a ligação com o estudante;
        await hobbies.map(async hobby => {
            const procurarHobbies = await connection(TB_HobbiesName).select().where("nome",`${hobby}`);
            
            if(procurarHobbies && procurarHobbies[0] && procurarHobbies !== undefined && procurarHobbies.length > 0){
                let newId = id + Math.floor(Math.random() * 99).toString();
                await connection.insert({id:newId, estudante_id:id, hobby_id:procurarHobbies[0].id}).into(TB_Estudantes_Hobby) 
                newId = newId + Math.floor(Math.random() - 5).toString()
            }else{
                let newId = id + Math.floor(Math.random() * 89).toString();
                await connection.insert({id:newId, nome:hobby}).into(TB_HobbiesName);
                await connection.insert({id:newId + "5", estudante_id:id, hobby_id:newId}).into(TB_Estudantes_Hobby); 
                newId = newId + Math.floor(Math.random() - 7).toString();   
            }
        })
        await connection(TABLE_Estudante).insert(novoEstudante)
        
        res.status(201).send("Estudante adicionado com sucesso...!")

    }catch(error:any){
        res.status(codeError).send(error.message)
    }

}