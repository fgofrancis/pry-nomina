import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[]= [
    {
      titulo:'Nómina',
      icono:'mdi mdi-gauge',
      submenu:[
        {titulo: 'Empleado', url:'/nomina/empleado'},
        {titulo: 'Escala Salarial', url:'/nomina/escala'},
        {titulo: 'Parámetros Generales', url:'/nomina/parametros'},
        {titulo: 'Rxjs', url:'/nomina/rxjs'},
        {titulo: 'Usuario', url:'/nomina/usuario'}
      ]
    },
    {
      titulo:'Contabilidad',
      icono:'mdi mdi-folder-lock-open',
      submenu:[
        {titulo: 'Balace general', url:'/nomina/empleado'},
        {titulo: 'Entrada de Diario', url:'/nomina/escala'},
        {titulo: 'Balanza de comprobación', url:'/nomina/parametros'}
      ]
    }
  ];


  constructor() { }
}
