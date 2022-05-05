import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Parametro } from 'src/app/models/parametro.model';
import { ParametroService } from 'src/app/services/parametro.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-parametro',
  templateUrl: './parametro.component.html',
  styles: [
  ]
})
export class ParametroComponent implements OnInit {

  public formParametro!:FormGroup;
  public parametros:Parametro[]= [];
  public parametroSeleccionado!: Parametro;

  constructor( private fb:FormBuilder,
               private _parametroService:ParametroService,
               private _router:Router,
               private _activatedRoute: ActivatedRoute)
   {}

  ngOnInit(): void {

    this._activatedRoute.params.subscribe(({id}) => this.cargarParametro(id));

    this.formParametro = this.fb.group({
      smp:['', Validators.required],
      sfs:['', Validators.required],
      svds:['', Validators.required]
    })
  }

  cargarParametro(id:string){

    if ( id === 'nuevo' ) {
      return;
    }

    this._parametroService.obtenerParametroByID(id)
          .subscribe(parametro =>{

            const { smp, sfs,svds } =parametro;
            this.formParametro.setValue( {  smp, sfs,svds });
            this.parametroSeleccionado = parametro;
          })

  }

  crearParametro(){
    if (this.parametroSeleccionado){
      //Actualizar
      const data = {
        ...this.formParametro.value,
        _id: this.parametroSeleccionado._id
      }
      this._parametroService.actualizarParametro(data)
          .subscribe(resp =>{
            Swal.fire( 'Actualizado',`Parámetro actualizado exitosamente` ,'success' );
            this._router.navigateByUrl('/nomina/parametros');
          })

    }else{
      //crear
      this._parametroService.crearParametro(this.formParametro.value)
          .subscribe( resp=>{
            Swal.fire( 'Registrado',`Parametros creados exitosamente` ,'success' );
            this._router.navigateByUrl('/nomina/parametros');
          })
    }
  }
}
