import { Sucursal } from './sucursal';
import { Genero } from './genero';

export class Pelicula {
    id:number;
	nombreOriginal:string;
	nombreTraducido:string;
	imagen:string;
    sinopsis:string;
    duracion:string;
    fechaEstreno:string;
    fechaBaja:string;
	sucursal:Sucursal[] = [];
	genero:Genero[] = [];
}
