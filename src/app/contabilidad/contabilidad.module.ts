import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContabilidadRoutingModule } from './contabilidad-routing.module';
import { BalancegeneralComponent } from './balancegeneral/balancegeneral.component';
import { BalanzacomprobacionComponent } from './balanzacomprobacion/balanzacomprobacion.component';
import { EntradadiarioComponent } from './entradadiario/entradadiario.component';


@NgModule({
  declarations: [
    BalancegeneralComponent,
    BalanzacomprobacionComponent,
    EntradadiarioComponent
  ],
  imports: [
    CommonModule,
    ContabilidadRoutingModule
  ]

})
export class ContabilidadModule { }
