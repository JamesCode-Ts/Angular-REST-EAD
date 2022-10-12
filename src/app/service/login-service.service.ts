import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { AppConstants } from '../app-constants';
import {Router} from '@angular/router';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  
  constructor(private http: HttpClient, private router: Router) { }

  recuperar(login){ /**Pega o login digitado pelo o usuario */
       
    let user = new User();
    user.login = login; /**Pega o login digitado pelo o usuario e salva no login do modelo*/

    /**Passa o user para o back-end para fazer a verificação, depois retorna o resultado em data */
    return this.http.post(AppConstants.getbaseUrlPath + 'recuperar/',user).subscribe(data => {

      alert(JSON.parse(JSON.stringify(data)).error); /** Converte o dado para o tipo string e depois converte para JSON.
                                                         Uma tecnica para evitar alguns problemas. Depois vem com a menssagem de error 
                                                         que foi setado no back-and, */

    }, 
    
    
    error => {
      
      console.error("Erro ao recuperar login ");
      alert('Erro ao recuperar login!')
     }
   );
    }

    login(usuario){
       
       return this.http.post(AppConstants.baseLogin ,JSON.stringify(usuario)).subscribe(data => {

          /*Retorno Http*/ 

          var token = JSON.parse(JSON.stringify(data)).Authorization.split(' ')[1];

          localStorage.setItem("token", token);

          console.info("Tohken: " + localStorage.getItem("token"));

          this.router.navigate(['home']);


       },
         error => {
      
          console.error("Erro ao fazer login ");
          alert('Acesso Negado!')
         }
       );
    }

}
