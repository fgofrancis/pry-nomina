import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'

import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  public formSubmitted= false;

  public registerForm = this.fb.group({
    name: ['Edwar00', [Validators.required, Validators.minLength(3)] ],
    email: ['edwar00@gmail.com', [Validators.required, Validators.email] ],
    password: ['123456', Validators.required ],
    password2: ['123456', [Validators.required] ],
    terminos: [ true, Validators.required],
    companiaID:['61e0617984eb7bd8ad11d58e'] // TODO: buscar como leer esta campo del document cia.
  }, {
    validators: this.passwordsIguales('password','password2')
  });
  
  constructor(private fb:FormBuilder,
              private _usuarioService: UsuarioService,
              private _router:Router ) { }

  crearUsuario(){
    this.formSubmitted = true;
    console.log(this.registerForm.value);

    if( this.registerForm.invalid  ){
      return;
    }

    // Realizar el posteo
    this._usuarioService.crearUsuario(this.registerForm.value)
            .subscribe( resp =>{

               // Navegar al dashboard
               this._router.navigateByUrl('/');

            }, (err)=>{ 
              // Si sucede un error
              Swal.fire('Error', err.error.msg, 'error' );
             } )
  };

  campoNoValido( campo:string):boolean{
    if(this.registerForm.get(campo)?.invalid && this.formSubmitted){
      return true;
    }else{
      return false;
    }
  };

  contrasenasNoValidas(){
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;
    if( (pass1 !== pass2) && this.formSubmitted ){
      return true
    }else{
      return false
    }

  };

  aceptaTermino(){
    return !this.registerForm.get('terminos')?.value && this.formSubmitted  
  };

  passwordsIguales(pass1Name: string, pass2Name: string){

    return ( formGroup: FormGroup) =>{

      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if (pass1Control?.value === pass2Control?.value ){
         pass2Control?.setErrors(null)
      }else{
         pass2Control?.setErrors({ noEsIgual: true})
      }
    }
   
  }
 
}
