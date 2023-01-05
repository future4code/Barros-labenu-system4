import express from 'express';
import cors from 'cors';


export const app = express()
const PORT = 3003

app.use(express.json())

app.use(cors())

app.listen(PORT,()=>{console.log(`SERVER IS RUNNING IN PORT ${PORT}`);
})

