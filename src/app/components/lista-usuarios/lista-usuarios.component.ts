import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EscolaridadeHelper } from '../../enums/escolaridade';
import { UsuariosService } from '../../services/usuarios.service';
import { DeletedMessageComponent } from '../../snack-bar/deleted-message/deleted-message.component';
import { Usuario } from './../../models/usuario';
import { DadosModelService } from '../service/dados-model.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss']
})
export class ListaUsuariosComponent implements OnInit {

  usuarios: Usuario[] = []
  displayedColumns: string[] = ['nome', 'sobrenome', 'email', 'escolaridade', 'actions'];

  constructor(private usuarioService: UsuariosService, private router: Router,
    private snackBar: MatSnackBar, private dadosModelService: DadosModelService) { }

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

  editarUsuario(usuario: Usuario) {
    this.dadosModelService.setUsuario(usuario);
    this.router.navigate(['/editar-usuarios']);
  }

}
