import { Request, Response } from "express"
import { Estudante } from "../class/Estudante"
import connection from "../database/connection"

export const addEstudante =  async (req:Request, res:Response):Promise <void> =>{
    const { nome, email, data_nasc, turma_id, hobbies} = req.body
    const id = Date.now().toString()

    const novoEstudante = new Estudante(id, nome, email, data_nasc, turma_id)
    await connection("Estudante").insert(novoEstudante)
    // await connection("Hobby").insert({nome:hobbies})
    res.status(201).send("Estudante adicionado com sucesso...!")
}