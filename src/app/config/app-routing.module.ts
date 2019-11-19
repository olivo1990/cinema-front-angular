import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../components/usuario/login/login.component';
import { InicioComponent } from '../components/inicio/inicio.component';
import { AuthGuard } from '../components/usuario/guards/auth.guard';
import { SucursalesComponent } from '../components/sucursales/sucursales.component';
import { SalasCineComponent } from '../components/salas-cine/salas-cine.component';

const routes: Routes = [
  { path: 'login/:over', component: LoginComponent },
  { path: 'inicio', component: InicioComponent, canActivate:[AuthGuard]},
  { path: 'sucursal', component: SucursalesComponent, canActivate:[AuthGuard]},
  { path: 'sala-cine', component: SalasCineComponent, canActivate:[AuthGuard]},
  { path: '**', pathMatch: 'full', redirectTo: 'login/1' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
