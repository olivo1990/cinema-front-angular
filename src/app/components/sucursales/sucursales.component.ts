import { Component, OnInit } from '@angular/core';
import { Sucursal } from '../../models/sucursal';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SucursalService } from '../../services/sucursal.service';
import { Usuario } from '../../models/usuario';
import { Ciudad } from '../../models/ciudad';
import { MatDialog } from '@angular/material';
import { AlertDialogComponent } from '../dialog//alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-sucursales',
  templateUrl: './sucursales.component.html',
  styleUrls: ['./sucursales.component.css']
})
export class SucursalesComponent implements OnInit {

  public sucursal:Sucursal;
  public usuarios:Usuario[];
  public ciudades:Ciudad[];

  constructor(private sucursalService: SucursalService, private dialog: MatDialog, private router:Router) { 
    this.sucursal = new Sucursal();
  }

  ngOnInit() {
    this.sucursalService.buscarUsuariosAdminSucursal().subscribe(usuario => this.usuarios = usuario);
    this.sucursalService.buscarCiudades().subscribe(ciudad => this.ciudades = ciudad);
  }

  descripcion = new FormControl('', [
    Validators.required
  ]);

  direccion = new FormControl('', [
    Validators.required
  ]);

  administrador = new FormControl('', [
    Validators.required
  ]);

  ciudad = new FormControl('', [
    Validators.required
  ]);

  guardar():void{
    let titulo:string;
    let mensaje:string;

    if(this.descripcion.hasError('required') || this.direccion.hasError('required') || this.administrador.hasError('required') || this.ciudad.hasError('required')){
      return;
    }
    
    this.sucursalService.guardar(this.sucursal).subscribe(sucursal => {

      console.log();

      this.router.navigate(['/inicio']);
      titulo = "Muy bien!";
      mensaje = "Se ha guardado con éxito la sucursal "+sucursal.descripcion+"!";
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
