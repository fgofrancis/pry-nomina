import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';

import { AcountSettingsComponent } from './acount-settings/acount-settings.component';
import { AsignacionesComponent } from './asignaciones/asignaciones.component';
import { ConstribucionleyComponent } from './constribucionley/constribucionley.component';
import { DeduccionesComponent } from './deducciones/deducciones.component';
import { EmpleadoComponent } from './empleado/empleado.component';
import { EscalasalarialComponent } from './escalasalarial/escalasalarial.component';
import { PagesComponent } from './pages.component';
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
      { path:'', component:EmpleadoComponent, data:{titulo: 'Empleado'}},
      { path:'asignaciones', component:AsignacionesComponent, data:{titulo: 'Asignaciones'}},
      { path:'constribuciones', component:ConstribucionleyComponent, data:{titulo: 'Constribuciones de Ley'}},
      { path:'deducciones', component:DeduccionesComponent, data:{titulo: 'Deducciones'}},
      { path:'empleado', component:EmpleadoComponent, data:{titulo: 'Empleado'}},
      { path:'escala', component:EscalasalarialComponent, data:{titulo: 'Escala Salarial'}},
      { path:'parametros', component:ParametrosgeneralesComponent, data:{titulo: 'Parámetros Generales'}},
      { path:'prcnomina', component:ProcnominaComponent, data:{titulo: 'Generaciòn de Nòmina'}},
      { path:'acount-setting', component: AcountSettingsComponent, data:{titulo: 'Configuraciòn'}},
      { path:'rxjs', component: RxjsComponent, data:{titulo: 'Rxjs'}},
      { path:'perfil', component: PerfilComponent, data:{titulo: 'Perfil de usuario'}},
      { path:'usuario', component: UsuariosComponent, data:{titulo: 'Usuarios'}}
    ]
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
