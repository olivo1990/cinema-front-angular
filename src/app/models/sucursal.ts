import { Ciudad } from './ciudad';
import { Pelicula } from './pelicula';

export class Sucursal {
    id:number;
	descripcion:string;
	direccion:string;
	idSupervisor:number;
    ciudad:Ciudad;
	pelicula:Pelicula[] = [];
}
