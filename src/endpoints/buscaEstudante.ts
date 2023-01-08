import { Request, Response } from "express";
import connection from "../database/connection";
import { TABLE_Estudante } from "../dataBase/tableNames";


export const buscaEstudante =  async (req:Request, res:Response):Promise <void> =>{
    let errorCode = 400;
    try {
        const {nome} = req.params;
        let result:object[] = [];
        if(!nome || nome === ":nome" || nome.includes(":")){
            result = await connection(TABLE_Estudante).select();
        }else{
            result =  await connection(TABLE_Estudante)
            .select()
            .whereLike('nome', `%${nome}%`)
        }
        if(result.length === 0){
            throw new Error("Digite um nome de estudante valido")
        }
        res.status(200).send(result)
        
    } catch (error:any) {
       res.status(errorCode).send(error.message)
    }

}