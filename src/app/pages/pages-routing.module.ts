import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AsignacionesComponent } from './asignaciones/asignaciones.component';
import { ConstribucionleyComponent } from './constribucionley/constribucionley.component';
import { DeduccionesComponent } from './deducciones/deducciones.component';
import { EmpleadoComponent } from './empleado/empleado.component';
import { EscalasalarialComponent } from './escalasalarial/escalasalarial.component';
import { PagesComponent } from './pages.component';
import { ParametrosgeneralesComponent } from './parametrosgenerales/parametrosgenerales.component';
import { ProcnominaComponent } from './procnomina/procnomina.component';

const routes: Routes = [
  { 
    path:'', component: PagesComponent,
    children:[
      { path:'asignaciones', component:AsignacionesComponent},
      { path:'constribuciones', component:ConstribucionleyComponent},
      { path:'deducciones', component:DeduccionesComponent},
      { path:'empleado', component:EmpleadoComponent},
      { path:'escala', component:EscalasalarialComponent},
      { path:'parametros', component:ParametrosgeneralesComponent},
      { path:'prcnomina', component:ProcnominaComponent},
      { path:'', component:EmpleadoComponent}
    ]
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
