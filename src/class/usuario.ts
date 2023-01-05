export class Usuario{
    constructor(
        protected id:string,
        protected nome:string,
        protected email:string,
        protected data_nasc:string,
        protected turma_id:string 
    ){}

    public static UserName(nome:string){
        console.log(`${nome}`);
        
    }

}