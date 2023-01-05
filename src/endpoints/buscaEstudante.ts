import { Request, Response } from "express";
import connection from "../database/connection";


export const buscaEstudante =  async (req:Request, res:Response):Promise <void> =>{

    const {nome} = req.params;
    let errorCode = 0
    try {

        if(!nome){
            errorCode = 400
            const error = new Error('Nome do aluno nao informado.')
            error.name = 'nameNotEntered'
            throw error
            
        }

        const result =  await connection('Estudante')
            .select()
            .whereLike('nome', `%${nome}%`)
        res.status(200).send(result)
        
    } catch (error:any) {
        if(error.name === 'nameNotEntered'){res.status(errorCode).send(error.message)}
    }

}