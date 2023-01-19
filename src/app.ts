import express,{Express} from 'express';
import cors from 'cors';


export const app: Express = express()
const PORT = 3003

app.use(express.json())

app.use(cors())

app.listen(PORT,()=>{console.log(`SERVER IS RUNNING IN PORT ${PORT}`);
})

