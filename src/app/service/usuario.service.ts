import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from '../app-constants';
import { UserReport } from '../model/UserReport';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  /**Implementação foi necessaria, pois as requisições não estavam 
   * enviando os tokens */ 
  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })
  };

  constructor(private http: HttpClient) {}
/**Estas funções vão se comunicar com os métodos do back-and, os end-pont no controller */
   getStudentList(): Observable<any> {    
    return this.http.get<any>(AppConstants.baseUrl, this.httpOptions);
   }


   getProfissaoList(): Observable<any>{
    return this.http.get<any>(AppConstants.getbaseUrlPath + 'profissao/')

   }

   getStudentListPage(pagina): Observable<any> {    
    return this.http.get<any>(AppConstants.baseUrl + 'page/' + pagina, this.httpOptions);
   }

   /**Pega o id do banco no back-end */
   getStudent(id): Observable<any> {    
    return this.http.get<any>(AppConstants.baseUrl + id, this.httpOptions);
   }


deletarUsuario(id: Number) : Observable<any>{
  return this.http.delete(AppConstants.baseUrl + id, {responseType : 'text'});
}

consultarUser(nome: String): Observable<any> {
  return this.http.get(AppConstants.baseUrl + "usuarioPorNome/" + nome, this.httpOptions);
  
}

consultarUserPoPage(nome: String, page : Number): Observable<any> {
  return this.http.get(AppConstants.baseUrl + "usuarioPorNome/" + nome + "/page/" + page, this.httpOptions);

}


salvarUsuario(user) : Observable<any>{

  return this.http.post<any>(AppConstants.baseUrl, user,this.httpOptions );

}

updateUsuario(user) : Observable<any>{

  return this.http.put<any>(AppConstants.baseUrl, user, this.httpOptions);

}



userAutenticado() {

  if (localStorage.getItem('token') !== null &&
    localStorage.getItem('token').toString().trim() !== null) {
    return true;
  } else {
    return false;
  }
}



removerTelefonte(id): Observable<any> {
  return this.http.delete(AppConstants.baseUrl + "removerTelefone/" + id, {responseType: 'text'});
}



downloadPdfRelatorio() {
  return this.http.get(AppConstants.baseUrl + 'relatorio', { responseType: 'text' }).subscribe(data => {
    document.querySelector('iframe').src = data;
  });
}



  downloadPdfRelatorioParam(userreport : UserReport) {

   return this.http.post(AppConstants.baseUrl + 'relatorio/', userreport , { responseType: 'text' }).subscribe(data => {
     document.querySelector('iframe').src = data;
   });
}


carregarGrafico() : Observable<any> {
  return this.http.get(AppConstants.baseUrl + 'grafico');
}



}
