import { Request, Response } from "express"

export async function getEstudante(req: Request, res: Response): Promise<void> {
    let errorCode = 400
    try {
        res.status(200).send({ message: "Olá estudantes, sejam bem vindos!" })
      } catch (error) {
        res.status(errorCode).send({ message: error.message })
      }
}