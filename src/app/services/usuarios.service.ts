import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private httpCliente: HttpClient) { }

  obtemUsuarios() {
    return this.httpCliente.get<Usuario[]>(`${environment.apiUrl}/usuarios`);
  }
}
