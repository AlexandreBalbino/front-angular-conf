import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private httpCliente: HttpClient) { }

  obtemUsuarios = () =>
    this.httpCliente.get<Usuario[]>(`${environment.apiUrl}/usuarios`);

  insereUsuario = (usuario: Usuario) =>
    this.httpCliente.post<void>(`${environment.apiUrl}/usuarios`, usuario);

  editarUsuario = (usuario: Usuario) =>
    this.httpCliente.put<void>(`${environment.apiUrl}/usuarios`, usuario);

  removerUsuario = (id: string) => this.httpCliente.delete<string>(`${environment.apiUrl}/usuarios/${id}`)
}
