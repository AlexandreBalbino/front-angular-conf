import { Router } from '@angular/router';
import { EscolaridadeHelper } from '../enums/escolaridade';
import { Usuario } from '../models/usuario';
import { UsuariosService } from './../services/usuarios.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeletedMessageComponent } from '../snack-bar/deleted-message/deleted-message.component';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss']
})
export class ListaUsuariosComponent implements OnInit {

  usuarios: Usuario[] = []
  displayedColumns: string[] = ['nome', 'sobrenome', 'email', 'escolaridade', 'actions'];

  constructor(private usuarioService: UsuariosService, private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.obterUsuarios();
  }

  obtemEscolaridade = (escolaridade: number) => new EscolaridadeHelper().obtemDescricaoEnum(escolaridade);

  obterUsuarios() {
    this.usuarioService.obtemUsuarios().subscribe(usuariosObtidos => {
      this.usuarios = usuariosObtidos;
    });
  }

  redirecionarNovoUsuario() {
    this.router.navigate(['/novo-usuario']);
  }

  removerUsuario(id: string) {
    this.usuarioService.removerUsuario(id).subscribe(() => {
      this.obterUsuarios();
      this.snackBar.openFromComponent(DeletedMessageComponent, {
        duration: 6000,
      })
    });
  }

}
