import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PagesRoutingModule } from './pages-routing.module';
import { EmpleadoComponent } from './empleado/empleado.component';
import { EscalasalarialComponent } from './escalasalarial/escalasalarial.component';
import { ParametrosgeneralesComponent } from './parametrosgenerales/parametrosgenerales.component';
import { AsignacionesComponent } from './asignaciones/asignaciones.component';
import { DeduccionesComponent } from './deducciones/deducciones.component';
import { ProcnominaComponent } from './procnomina/procnomina.component';
import { ConstribucionleyComponent } from './constribucionley/constribucionley.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { AcountSettingsComponent } from './acount-settings/acount-settings.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';


@NgModule({
  declarations: [
    EmpleadoComponent,
    EscalasalarialComponent,
    ParametrosgeneralesComponent,
    AsignacionesComponent,
    DeduccionesComponent,
    ProcnominaComponent,
    ConstribucionleyComponent,
    PagesComponent,
    AcountSettingsComponent,
    RxjsComponent,
    PerfilComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
