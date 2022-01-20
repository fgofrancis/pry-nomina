import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { UsuarioService } from 'src/app/services/usuario.service';

declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css']
})
export class LoginComponent implements OnInit {

  public formSubmitted= false;
  public auth2: any;

  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email] ],
    password: ['', Validators.required ],
    remember:[ false]
  });

  constructor( private _router:Router,
               private fb:FormBuilder,
               private _usuarioService: UsuarioService,
               private _ngZone:NgZone) { }

  ngOnInit(): void {
    this.renderButton();
  }
 
  login(){

    // console.log(this.loginForm.value);
    this._usuarioService.login(this.loginForm.value)
              .subscribe( resp=>{

                if(this.loginForm.get('remember')!.value){
                  localStorage.setItem( 'email',this.loginForm.get('email')!.value );
                }else{
                  localStorage.removeItem('email');
                }
                
              // Navegar al dashboard
              this._router.navigateByUrl('/');

              }, (err)=>{
                  // Si sucede un error
              Swal.fire('Error', err.error.msg, 'error' );
              })

  }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
    });

    this.startApp();
  };
 
  // Generando token de Google, para luego generar el token de la aplicacion.
  async startApp () {
    
    await this._usuarioService.googleIni();
    this.auth2 = this._usuarioService.auth2;
    
    this.attachSignin(document.getElementById('my-signin2'));
  };

  attachSignin(element:any) {
    // console.log(element.id);
    this.auth2.attachClickHandler(element, {},
        (googleUser:any)=> {
            const id_token = googleUser.getAuthResponse().id_token;
            // console.log(id_token);
            this._usuarioService.loginGoogle(id_token)
            .subscribe( resp =>{

              // Navegar al dashboard
              this._ngZone.run( ()=>{
                this._router.navigateByUrl('/');
              })
            });


        }, (error:any) => {
          alert(JSON.stringify(error, undefined, 2));
        });
  }

}
