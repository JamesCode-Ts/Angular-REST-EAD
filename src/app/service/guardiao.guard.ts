import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})

/** O Quardião serve para proteger as rotas, ou seja é uma questão de segurança.
 * Por exemplo : para que não haja violação de acesso caso não tenha uma autenticação.
 */
export class GuardiaoGuard implements CanActivate {


  constructor(private userServcice: UsuarioService) {

  }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.info(" Guardião sendo chamado")
      return this.userServcice.userAutenticado();
  }

}
