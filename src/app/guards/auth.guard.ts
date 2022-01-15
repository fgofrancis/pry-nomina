import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { tap } from 'rxjs/operators';
import { UsuarioService } from '../services/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 
  constructor( private _usuarioService:UsuarioService,
               private _router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

      // La peticion se subcribe y el mismo maneja el unsubcribe y todo
    return this._usuarioService.validarToken()
            .pipe(
              tap( estaAutenticado =>{

                if( !estaAutenticado) {
                    this._router.navigateByUrl('auth/login');
                }
              })
            )
  }
  
}
