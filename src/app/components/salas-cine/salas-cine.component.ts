import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AlertDialogComponent } from 'src/app/components/dialog//alert-dialog/alert-dialog.component';
import { SalaCineService } from 'src/app/services/sala-cine.service';
import { SalasCine } from 'src/app/models/salas-cine';
import { TipoFormato } from 'src/app/models/tipo-formato';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario-service.service';
import { Sucursal } from 'src/app/models/sucursal';

@Component({
  selector: 'app-salas-cine',
  templateUrl: './salas-cine.component.html',
  styleUrls: ['./salas-cine.component.css']
})
export class SalasCineComponent implements OnInit {

  public salaCine:SalasCine;
  public tipoFormatos:TipoFormato[];
  public sucursales:Sucursal[];
  public usuario:Usuario;

  constructor(private salaService: SalaCineService, private usuarioService: UsuarioService, private dialog: MatDialog, private router:Router) { }

  ngOnInit() {
    this.salaCine = new SalasCine();
    this.usuario = this.usuarioService.usuario;
    this.salaService.buscarTipoSala().subscribe(tipoFormato => this.tipoFormatos = tipoFormato);
    this.salaService.buscarSucursal(this.usuario.id).subscribe(sucusales => this.sucursales = sucusales);
  }

  sucursal = new FormControl('', [
    Validators.required
  ]);

  formato = new FormControl('', [
    Validators.required
  ]);

  nroFilas = new FormControl('', [
    Validators.required
  ]);

  guardar():void{
    let titulo:string;
    let mensaje:string;

    if(this.sucursal.hasError('required') || this.formato.hasError('required') || this.nroFilas.hasError('required')){
      return;
    }
    
    if(this.salaCine.nroFilas != 0 && this.salaCine.nroFilas > 27){
      this.openAlertDialog("Mensaje del sistema", "El numero de fila limite son de 27", true);
      return;
    }
    
    this.salaService.guardar(this.salaCine).subscribe(salaCine => {

      console.log(salaCine);

      this.router.navigate(['/inicio']);
      titulo = "Muy bien!";
      mensaje = "Se ha guardado con éxito la sala de cine!";
      this.openAlertDialog(titulo, mensaje, false);
      
    }, err => {
      if (err.status == 400) {
        //swal('Error Login', 'Usuario o clave incorrectas!', 'error');
        titulo = "Mensaje del servidor";
        mensaje = "";
        this.openAlertDialog(titulo, mensaje, true);
      }else{
        titulo = "Error del servidor!";
        mensaje = "Ha ocurrido un error inesperado";
        this.openAlertDialog(titulo, mensaje, true);
      }
    }
    );

  }

  openAlertDialog(titulo:string, mensaje:string, error:boolean) {
    this.dialog.open(AlertDialogComponent,{
      width: '300px',
      data:{
        title: titulo,
        message: mensaje,
        error: error,
        buttonText: {
          cancel: 'Cerrar'
        }
      },
    });
  }

}
