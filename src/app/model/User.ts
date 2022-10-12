import { Profissao } from "./Profissao";
import { Telefone } from "./telefone";

export class User {

    id: Number;
    login: String;
    nome: String;
    cpf: String;
    senha: String;
    dataNascimento: String;
    profissao : Profissao = new Profissao;

    salario : DoubleRange;

    telefones: Array<Telefone>;
    
}
