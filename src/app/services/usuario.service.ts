import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap,map, catchError } from 'rxjs/operators';

import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from 'src/environments/environment';

import { LoginForm } from '../interfaces/login-form';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

const base_url = environment.base_url;
declare const gapi:any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2:any;

  constructor(private http:HttpClient,
              private _router:Router,
              private _ngZone:NgZone) {
    
    this.googleIni();
  }

  googleIni(){

    return new Promise<void>(resolve =>{
  
      gapi.load('auth2', ()=> {
        this.auth2 = gapi.auth2.init({
          client_id: '810013240590-m0hbphchbo2h63v1am9ms3r9s260poto.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve();
      });

    })
  }

  logout(){
    
    localStorage.removeItem('token');
   
    this.auth2.signOut().then( ()=> {

      this._ngZone.run( ()=>{
        this._router.navigateByUrl('/auth/login');
      })
    });

  };


  validarToken():Observable<boolean>{

    const token = localStorage.getItem('token') || '';

    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap( (resp:any) =>{
        localStorage.setItem('token',resp.token)
      }),
      map(resp => true),
      catchError( error=> of(false) )  
    );


  };

  crearUsuario( formData: RegisterForm){
    
    return this.http.post(`${base_url}/usuarios`, formData)
    .pipe(
      tap( (resp:any) =>{
        localStorage.setItem('token',resp.token)
      })
    )
  };

  login(formData: LoginForm){
    
    return this.http.post(`${base_url}/login`, formData)
                .pipe(
                  tap( (resp:any )=>{
                    localStorage.setItem('token',resp.token)
                  })
                )
  };

  loginGoogle(token:any){
    
    return this.http.post(`${base_url}/login/google`, {token})
                .pipe(
                  tap( (resp:any )=>{
                    localStorage.setItem('token',resp.token)
                  })
                )
  }
}
