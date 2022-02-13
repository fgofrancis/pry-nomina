import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { Compania } from '../models/compania.model';
import { Usuario } from '../models/usuario.model';
import { Empleado } from '../models/empleado.model';

import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor( private http:HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  };

  get headers(){
    return {
      headers: {
        'x-token': this.token
      }
    }
  };

  private transformarUsuarios( resultados: any[]):Usuario[]{

    return resultados.map(
      user => new Usuario(user.companiaID,user.name, user.email, '',user.img,user.google,user.role,user.uid)
    );
  }

  private transformarCompanias( resultados: any[]):Compania[]{

    return resultados;
  }
  private transformarEmpleados( resultados: any[]):Empleado[]{

    return resultados;
  }

  buscar(tipo: 'escalas'| 'usuarios'| 'empleados'|'companias',
         termino:string )
         {
    const url = `${base_url}/todo/coleccion/${tipo}/${termino}`;
    return this.http.get<any[]>( url, this.headers )
        .pipe(
          map( (resp:any) => {
            
            switch ( tipo) {
              case 'usuarios':
                return this.transformarUsuarios(resp.resultados);

              case 'empleados':
                return this.transformarEmpleados(resp.resultados);

              case 'companias':
                return this.transformarCompanias(resp.resultados);
            
              default:
                return [];
            }
          })
        )

  }

}
