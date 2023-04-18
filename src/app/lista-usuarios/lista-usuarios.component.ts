import { Router } from '@angular/router';
import { EscolaridadeHelper } from '../enums/escolaridade';
import { Usuario } from '../models/usuario';
import { UsuariosService } from './../services/usuarios.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss']
})
export class ListaUsuariosComponent implements OnInit {

  usuarios: Usuario[] = []
  displayedColumns: string[] = ['nome', 'sobrenome', 'email', 'escolaridade', 'actions'];

  constructor(private usuarioService: UsuariosService, private router: Router) { }

  ngOnInit(): void {
    this.usuarioService.obtemUsuarios().subscribe(usuariosObtidos => {
      this.usuarios = usuariosObtidos
    })
  }

  obtemEscolaridade = (escolaridade: number) => new EscolaridadeHelper().obtemDescricaoEnum(escolaridade);

  redirecionarNovoUsuario() {
    this.router.navigate(['/novo-usuario']);
  }

}
