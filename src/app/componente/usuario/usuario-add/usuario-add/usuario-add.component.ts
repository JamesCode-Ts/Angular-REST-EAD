import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/User';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Telefone } from 'src/app/model/Telefone';
import { NgbDateParserFormatter, NgbDateStruct, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { Profissao } from 'src/app/model/Profissao';


@Injectable()
export class FormatDateAdapter extends NgbDateAdapter<string> {

  readonly DELIMITER = '/';

  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10)
      };
    }
    return null;
  }


  toModel(date: NgbDateStruct | null): string | null {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : null;
  }


}


@Injectable()
export class FormataData extends NgbDateParserFormatter {

  readonly DELIMITER = '/'; // 18/10/1987

/** A data vem em forma de um arrray, com isso é possivel manipular os dados 
 * para deixa-los no front de uma forma formata para o padrão br, dd/mm/yyyy.
 */

  parse(value: string): NgbDateStruct | null { /** Estrutura da data */

    if (value) {
      let date = value.split(this.DELIMITER); /**Separador split usando o / como delimitador */
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10)
      };
    }
    return null;
  }

  format(date: NgbDateStruct): string | null { /* Para a formatação */

    return date ? validarDia(date.day) + this.DELIMITER + validarDia(date.month) + this.DELIMITER + date.year : '';
  }

  toModel(date: NgbDateStruct | null): string | null { /**Passando para o modelo */
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : null;
  }

}

/** Serve para deixar o valor com um 0 se for menor ou igual a 9 */
function validarDia(valor) {
  if (valor.toString !== '' && parseInt(valor) <= 9) {
    return '0' + valor;
  } else {
    return valor;
  }
}


@Component({
  selector: 'app-usuario-add',
  templateUrl: './usuario-add.component.html',
  styleUrls: ['./usuario-add.component.css'],
  providers: [{ provide: NgbDateParserFormatter, useClass: FormataData },
    { provide: NgbDateAdapter, useClass: FormatDateAdapter }]
})

export class UsuarioAddComponent implements OnInit {

  usuario = new User();
  telefone = new Telefone();
  profissoes : Array<Profissao>
  constructor(private routeActive: ActivatedRoute, private userService: UsuarioService) { }

  ngOnInit() {


this.userService.getProfissaoList().subscribe(data =>{
  this.profissoes = data;
})


let id = this.routeActive.snapshot.paramMap.get('id');

if(id != null){
 
this.userService.getStudent(id).subscribe(data =>{
  /**,
   * A variavel data recebe o valor do back-end, passado pelo a função getStudent.
   * Com isso o usuario vai ser igual ao retorno que veio do back-end.
   */
  this.usuario = data;
})
}

  }
  salvarUser() {
   
    if(this.usuario.id != null && this.usuario.id.toString().trim != null){ /** Atualizando ou  Editando */
      this.userService.updateUsuario(this.usuario).subscribe(data =>{
        console.info(" User Atualizado: " + data);
        this.novo();
      });

    }else{
      this.userService.salvarUsuario(this.usuario).subscribe(data =>{ /**Salvando usuario */
      this.novo();
      console.info(" Gravou User " + data);
       
         
      });
    }
    
}



deletarTelefone(id, i) {

  if (id == null) {
    this.usuario.telefones.splice(i, 1);
    return;
  }


  if (id !== null && confirm("Deseja remover?")) {

    this.userService.removerTelefonte(id).subscribe(data => {

      this.usuario.telefones.splice(i, 1);

    });
  }
}



addFone() {

  if (this.usuario.telefones === undefined) {
    this.usuario.telefones = new Array<Telefone>();
  }

  this.usuario.telefones.push(this.telefone);
  this.telefone = new Telefone();

}

novo() {
  this.usuario = new User();
  this.telefone = new Telefone();
}

}
