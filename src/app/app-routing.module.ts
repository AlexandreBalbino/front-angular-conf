import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaUsuariosComponent } from './components/lista-usuarios/lista-usuarios.component';
import { NovoUsuarioComponent } from './components/novo-usuario/novo-usuario.component';
import { EditarUsuariosComponent } from './components/editar-usuarios/editar-usuarios.component';

const routes: Routes = [
  { path: 'lista-usuarios', component: ListaUsuariosComponent },
  { path: 'novo-usuario', component: NovoUsuarioComponent },
  { path: 'editar-usuarios', component: EditarUsuariosComponent },
  { path: '', redirectTo: '/lista-usuarios', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
