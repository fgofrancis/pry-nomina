import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Asignacion } from 'src/app/models/asignacion.model';

import { Empleado } from 'src/app/models/empleado.model';
import { AsignacionService } from 'src/app/services/asignacion.service';
import { DeduccionService } from 'src/app/services/deduccion.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { RetencionLeyService } from 'src/app/services/retencionLey.service';

@Component({
  selector: 'app-deduccion',
  templateUrl: './deduccion.component.html',
  styles: [
  ]
})
export class DeduccionComponent implements OnInit {

  public formDeduccion!:FormGroup;
  public empleados:Empleado[]= [];
  public empleadoSeleccionado!:Empleado;

  public nombreCompleto?:string = '';
  public salarioMensual:number  = 0;

  public retencionLeyTotal:number    = 0; 
  public otrasDeducciones :number    = 0; 
  public ingresosExentoISR:number    = 0;
  public totalRenglones:number       = 0;
  public salarioCotizableTSS:number = 0; 
  public salarioCotizableISR:number  = 0; 

  public rSFS:number = 0;
  public rAFP:number = 0;
  public rISR:number = 0;
  public asignaciones:Asignacion[]=[];
  public asignacion!:Asignacion;

  public isrF:number = 0;

  constructor(private fb:FormBuilder,
              private _empleadoService:EmpleadoService,
              private _deduccionService:DeduccionService,
              // private _parametroService:ParametroService,
              private _retencionLeyService:RetencionLeyService,
              private _asignacionService:AsignacionService) { }



  ngOnInit(): void {

    this.formDeduccion = this.fb.group({
      empleado:['',Validators.required],
      sfs:[''],
      afp:[''],
      depAdicTSS:[''],
      retISR:[''],
      cxc:[''],
      otroDesc:['']

    })

     //Para llenar el comboBox de empleado
     this.cargarEmpleado();
     
     this.formDeduccion.get('empleado')?.valueChanges
        .subscribe(empleadoID=>{

          this.empleadoSeleccionado = this.empleados.find(e =>e._id === empleadoID)!;

          const {name1,name2, apell1, apell2, salario }= this.empleadoSeleccionado!
          this.nombreCompleto = this._empleadoService.nombreCompleto(name1,name2, apell1, apell2);
         
          this.salarioMensual = salario
          this.retencionLey(this.empleadoSeleccionado)

        })
  }
  

  cargarEmpleado(){
    this._empleadoService.cargarEmpleados()
        .subscribe(empleados=>{
          this.empleados = empleados;
          // console.log('Emple....', this.empleados)
        })
  }

  crearDeduccion(){
   
    const {sfs, afp,depAdicTSS, retISR,
          cxc, otroDesc} = this.formDeduccion.value;
    
    this.retencionLeyTotal = sfs + afp + depAdicTSS, retISR;

    this.otrasDeducciones = cxc, otroDesc
    
    const data = {
      ...this.formDeduccion.value,
      retencionesLey:{sfs, afp,adicTSS:depAdicTSS, retISR},
      otrasDeducciones:{cxcEmpleado:cxc, otrosDescuentos:otroDesc }
    }

    this._deduccionService.crearDeduccion(data)
        .subscribe(resp=>{
          // console.log('Creada', resp)
        })
  }

 
   retencionLey(empleado:Empleado){
 
    //Calc RetencionesLey
    this._asignacionService.cargarAsignaciones()
        .subscribe(asignacion=>{
          this.asignaciones = asignacion;

          // Buscando asignacion correspondiente al empleado    
          this.asignacion =this.asignaciones.find(e =>e.empleado._id ===empleado._id)!;    
 
          const {comisiones, salario, vacaciones} = this.asignacion.salarioCotizableTSS
          this.salarioCotizableTSS =(salario* 2 + comisiones! + vacaciones! )

          this.rSFS = this.calcSFS(this.salarioCotizableTSS);
          // console.log('SFS Componente..: ', this.rSFS);

          this.rAFP = this.calcAFP(this.salarioCotizableTSS);
          // console.log('AFP Componente..: ', this.rAFP);

          this.salarioCotizableISR = this.salarioCotizableTSS - ((this.rSFS +  this.rAFP)*2)
          this.rISR =  this.calcISR(this.salarioCotizableISR);
          // console.log('ISR Componente..: ', this.rISR);
        })
        
  }
 
  calcSFS(salario:number):number{
    // console.log('Salario_SFS', salario)
    return this._retencionLeyService.calcSFS(salario);
  }
 
  calcAFP(salario:number):number{
    // console.log('Salario_AFP', salario)
    return this._retencionLeyService.calcAFP(salario)
  }
   calcISR(salario:number):number{
   return (this._retencionLeyService.calcISR(salario) / 12) / 2;
  }

}
