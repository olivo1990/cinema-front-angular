import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_SERVICE } from '../config/config';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { TipoFormato } from '../models/tipo-formato';
import { Sucursal } from '../models/sucursal';
import { SalasCine } from '../models/salas-cine';

@Injectable({
  providedIn: 'root'
})
export class SalaCineService {

  private urlEndPoint = URL_SERVICE;

  constructor(private http: HttpClient) { }

  public buscarTipoSala():Observable<TipoFormato[]>{
    const urlEndpoint = this.urlEndPoint+'/listar-tipo-sala';

    return this.http.post<TipoFormato[]>(urlEndpoint, null, { });
  }

  public buscarSucursal(idAdmin:number):Observable<Sucursal[]>{

    const urlEndpoint = this.urlEndPoint+'/listar-sucursal';
    let params = new URLSearchParams();
    params.set('idAdmin', ""+idAdmin);

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.post<Sucursal[]>(urlEndpoint, params.toString(), { headers: httpHeaders });
  }

  public guardar(salaCine: SalasCine): Observable<SalasCine> {
    return this.http.post<SalasCine>(`${this.urlEndPoint}/guardar-sucursal`, salaCine, { });
  }
}
