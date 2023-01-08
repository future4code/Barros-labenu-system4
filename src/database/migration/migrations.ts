import connection from "../connection";
import * as table from "../tableNames";





const printError = (error: any) => {
  console.log(error.sqlMessage || error.message)
}

const createTables = async ():Promise<void> => {
  await connection.raw(`
    DROP TABLE IF EXISTS 
      ${table.TABLE_Docente},${table.TABLE_Estudante},
      ${table.TABLE_Turma},${table.TB_Docente_Espec},
      ${table.TB_Especialidade},${table.TB_Estudantes_Hobby},
      ${table.TB_HobbiesName};


    CREATE TABLE IF NOT EXISTS ${table.TB_HobbiesName}(
      id VARCHAR(255) PRIMARY KEY NOT NULL,
      nome VARCHAR(255) NOT NULL UNIQUE
    );

    CREATE TABLE IF NOT EXISTS ${table.TB_Especialidade}(
      id VARCHAR(255) PRIMARY KEY NOT NULL,
      nome VARCHAR(255) NOT NULL UNIQUE
    );

    CREATE TABLE IF NOT EXISTS ${table.TABLE_Turma}(
      id VARCHAR(255) PRIMARY KEY NOT NULL,
      nome VARCHAR(255) ,
      modulo INT DEFAULT 0
    );
  
    CREATE TABLE IF NOT EXISTS ${table.TABLE_Docente}(
      id VARCHAR(255) PRIMARY KEY NOT NULL,
      nome VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      data_nasc VARCHAR(255) NULL,
      turma_id VARCHAR(255)  NOT NULL,
      FOREIGN KEY(turma_id) REFERENCES ${table.TABLE_Turma}(id)
    );
    
    CREATE TABLE IF NOT EXISTS ${table.TB_Docente_Espec}(
      id VARCHAR(255) PRIMARY KEY NOT NULL,
      docente_id VARCHAR(255)  NOT NULL,
      especialidade_id VARCHAR(255) NOT NULL,
      FOREIGN KEY(docente_id) REFERENCES ${table.TABLE_Docente}(id),
      FOREIGN KEY(especialidade_id) REFERENCES ${table.TB_Especialidade}(id)
    );

    CREATE TABLE IF NOT EXISTS ${table.TABLE_Estudante}(
      id VARCHAR(255) PRIMARY KEY NOT NULL,
      nome VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      data_nasc VARCHAR(255) NOT NULL,
      turma_id VARCHAR(255) NOT NULL,
      FOREIGN KEY(turma_id) REFERENCES ${table.TABLE_Turma}(id)
    );
    
    CREATE TABLE IF NOT EXISTS ${table.TB_Estudantes_Hobby}(
      id VARCHAR(255) PRIMARY KEY NOT NULL,
      estudante_id VARCHAR(255) NOT NULL,
      hobby_id VARCHAR(255) NOT NULL,
      FOREIGN KEY(estudante_id) REFERENCES ${table.TABLE_Estudante}(id),
      FOREIGN KEY(hobby_id) REFERENCES ${table.TB_HobbiesName}(id)
    );

    INSERT INTO ${table.TABLE_Turma} (id,nome,modulo) 
    VALUES 
    ("01010101","JBL-Barros",7),
    ("02020202","JBL-Jamison",7),
    ("03030303","JBL-Batman",0);

    INSERT INTO ${table.TABLE_Estudante} (id,nome,email,data_nasc,turma_id)
    VALUES
    ("00001","Diego Rios","diegoRS_dev@hotmail.com","01/02/2000","01010101"),
    ("00002","Jose Algusto","joseAlg@gmail.com","01/01/2000","01010101"),
    ("00003","Marcio Emmanuel","marcioE@outlook.com","01/03/2000","01010101");

    INSERT INTO ${table.TABLE_Docente} (id,nome,email,data_nasc,turma_id)
    VALUES
    ("002010301","Lab-Boot","labBoot@boot.com","25/10/2015","03030303"),
    ("002010302","miranha","miranha123.@gmail.com","10/01/1990","02020202");
    
    INSERT INTO ${table.TB_Especialidade} (id, nome)
    VALUES 
    ("012341","JS"),
    ("012342","React"),
    ("012343","POO"),
    ("012344","Typescript"),
    ("012345","CSS");

    INSERT INTO ${table.TB_Docente_Espec} (id,docente_id,especialidade_id)
    VALUES
    ("02341227","002010301","012344"),
    ("03010238","002010302","012342");

    INSERT INTO ${table.TB_HobbiesName} (id, nome)
    VALUES
    ("100908","Jogar Video Games"),
    ("100907","Assistir Series"),
    ("100906","Ler Livros"),
    ("100905","Correr");

    INSERT INTO ${table.TB_Estudantes_Hobby} (id,estudante_id,hobby_id)
    VALUES 
    ("01","00001","100908"),
    ("02","00001","100907"),
    ("03","00002","100906"),
    ("04","00003","100908"),
    ("05","00002","100905"),
    ("06","00003","100905");
      
  `).then(() => {
      console.log(`Tabelas criadas com sucesso!`)
      connection.destroy()
  }).catch((error: any) => printError(error))

}
createTables()

