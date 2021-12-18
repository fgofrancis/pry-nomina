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
        {titulo: 'Rxjs', url:'/nomina/rxjs'}
      ]
    },
    // {
    //   titulo:'Capital Humano',
    //   icono:'mdi mdi-gauge',
    //   submenu:[
    //     {titulo: 'Empleado', url:'/nomina/empleado'},
    //     {titulo: 'Escala Salarial', url:'/nomina/escala'},
    //     {titulo: 'Parámetros Generales', url:'/nomina/parametros'}
    //   ]
    // }
  ];


  constructor() { }
}
