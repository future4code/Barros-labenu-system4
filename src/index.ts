import app from "./app"
import { getEstudante } from "./endpoint/getEstudante"

app.get("/estudante", getEstudante)