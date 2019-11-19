import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_SERVICE } from '../config/config';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Sucursal } from '../models/sucursal';
import { Usuario } from '../models/usuario';
import { Ciudad } from '../models/ciudad';

@Injectable({
  providedIn: 'root'
})
export class SucursalService {

  private urlEndPoint = URL_SERVICE;

  constructor(private http: HttpClient) { }

  public buscarUsuariosAdminSucursal():Observable<Usuario[]>{
    const urlEndpoint = this.urlEndPoint+'/listar-admin';

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.post<Usuario[]>(urlEndpoint, null, { headers: httpHeaders });
  }

  public buscarCiudades():Observable<Ciudad[]>{
    const urlEndpoint = this.urlEndPoint+'/listar-ciudad';

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.post<Ciudad[]>(urlEndpoint, null, { headers: httpHeaders });
  }

  public guardar(sucursal: Sucursal): Observable<Sucursal> {
    return this.http.post<Sucursal>(`${this.urlEndPoint}/guardar-sucursal`, sucursal, { });
  }
}
