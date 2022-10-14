import { Profissao } from "./Profissao";
import { Telefone } from "./telefone";


/** Para que acha comunicação dos atributos dos objetos.
 * é preciso que tenha um modelo identico de class do back-end em java.
 * Representado em model no angular dessa forma, mesmos tipos de atributos 
 * Respequitivamentes as linguagens utilizadas.
 */
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
