import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';

import { AcountSettingsComponent } from './acount-settings/acount-settings.component';
import { AsignacionComponent } from './asignaciones/asignacion.component';
import { AsignacionesComponent } from './asignaciones/asignaciones.component';
import { CompaniaMComponent } from './compania-m/compania-m.component';
import { CompaniaComponent } from './compania/compania.component';
import { ConstribucionleyComponent } from './constribucionley/constribucionley.component';
import { DeduccionComponent } from './deducciones/deduccion.component';
import { DeduccionesComponent } from './deducciones/deducciones.component';
import { EmpleadoMComponent } from './empleado/empleado-m.component';
import { EmpleadoComponent } from './empleado/empleado.component';
import { EscalaComponent } from './escalasalarial/escala.component';
import { EscalasalarialComponent } from './escalasalarial/escalasalarial.component';
import { PagesComponent } from './pages.component';
import { ParametroComponent } from './parametrosgenerales/parametro.component';
import { ParametrosgeneralesComponent } from './parametrosgenerales/parametrosgenerales.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ProcnominaComponent } from './procnomina/procnomina.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

const routes: Routes = [
  { 
    path:'', component: PagesComponent,
    canActivate:[ AuthGuard],
    children:[
      { path:'', component:RxjsComponent, data:{titulo: 'Rxjs'}},
      { path:'acount-setting', component: AcountSettingsComponent, data:{titulo: 'Configuraciòn'}},
      
      { path:'asignaciones', component:AsignacionesComponent, data:{titulo: 'Mantenimiento de Asignaciones'}},
      { path:'asignacion/:id', component:AsignacionComponent, data:{titulo: 'Asignaciones'}},
      
      { path:'deducciones', component:DeduccionesComponent, data:{titulo: 'Mantenimiento de Deducciones'}},
      { path:'deduccion/:id', component:DeduccionComponent, data:{titulo: 'DEDUCCION'}},
      
      { path:'compania', component:CompaniaComponent, data:{titulo: 'Mantenimiento de Compañías'}},
      { path:'companiaM', component:CompaniaMComponent, data:{titulo: 'Compañía'}},
     
      { path:'constribuciones', component:ConstribucionleyComponent, data:{titulo: 'Constribuciones de Ley'}},
      { path:'deducciones', component:DeduccionesComponent, data:{titulo: 'Deducciones'}},
     
      { path:'empleado', component:EmpleadoComponent, data:{titulo: 'Mantenimiento de Empleado'}},
      // { path:'empleadoM', component:EmpleadoMComponent, data:{titulo: 'Empleado'}},
      { path:'empleadoM/:id', component:EmpleadoMComponent, data:{titulo: 'Empleado'}},
     
      { path:'escalaSalarial', component:EscalasalarialComponent, data:{titulo: 'Escala Salarial'}},
      { path:'escala/:id', component:EscalaComponent, data:{titulo: 'Escala '}},
     
      { path:'parametros', component:ParametrosgeneralesComponent, data:{titulo: 'Parámetros Generales'}},
      { path:'parametros/:id', component:ParametroComponent, data:{titulo: 'Parámetro'}},
      
      { path:'perfil', component: PerfilComponent, data:{titulo: 'Perfil de usuario'}},
      { path:'prcnomina', component:ProcnominaComponent, data:{titulo: 'Generaciòn de Nòmina'}},
      { path:'rxjs', component: RxjsComponent, data:{titulo: 'Rxjs'}},
      { path:'usuario', component: UsuariosComponent, data:{titulo: 'Mantenimiento de Usuarios'}}
    ]
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
