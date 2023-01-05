import { Request, Response } from "express"
import { Turma } from "../class/Turma"
import connection from "../database/connection"

export const criarTurma = async (req:Request, res:Response):Promise <void> =>{
    const { nome, modulo } = req.body

    const id = Date.now().toString()
    const novaTurma = new Turma(id, nome, modulo)

    await connection.insert(novaTurma).into("Turma")
    res.status(200).send("Turma criada com sucesso...!")
}

