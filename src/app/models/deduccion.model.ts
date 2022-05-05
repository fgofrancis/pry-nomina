import { Empleado } from "./empleado.model";

interface  IRetencionesLey {
    sfs:number,
    afp:number,
    adicTSS?:number,
    retISR?:number
}
 
interface IOtrasDeducciones {
    cxcEmpleado?:number,
    otrosDescuentos?:number
}


export class Deduccion{

    constructor(
        public _id:string,
        public empleado:Empleado,
        public retencionesLey:IRetencionesLey,
        public otrasDeducciones:IOtrasDeducciones,
        public fechaRegistro:Date
    ){}
}
//uid
//public fechaRegistro: Date