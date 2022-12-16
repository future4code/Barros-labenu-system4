class Estudante{
    id: string;
    nome: string;
    email: string;
    data_nasc: string;
    turma_id: string

    constructor(id: string, nome: string, email: string, data_nasc: string, turma_id: string){
            this.id = id,
            this.nome = nome,
            this.email = email,
            this.data_nasc = data_nasc,
            this.turma_id = turma_id
        }
}

export default Estudante