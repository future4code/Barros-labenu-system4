import { connection } from "./connection"


const printError = (error: any) => { console.log(error.sqlMessage || error.message) }

const createTable = () => connection.raw(`
    CREATE TABLE estudante (
        id INT PRIMARY KEY AUTO_INCREMENT,
        nome VARCHAR (255) NOT NULL,
        email VARCHAR (255) NOT NULL,
        data_nasc VARCHAR (255) NOT NULL,
        hobbies VARCHAR (255) NOT NULL
    );
`).then(() => console.log('Tabela criada com sucesso!')).catch(printError)

const insertUsers = () => connection.raw(`    
    INSERT INTO estudante VALUES (1,'Soter','soter@labenu','2000-05-12','jogar bola');
    INSERT INTO estudante VALUES (2,'João','joao@labenu','1999-03-22','tocar violão');
    INSERT INTO estudante VALUES (3,'Paula','paula@labenu','2002-07-17', 'assistir séries');
    
`)


createTable().then(insertUsers)

const finish = () => connection.destroy()

createTable().then(finish)