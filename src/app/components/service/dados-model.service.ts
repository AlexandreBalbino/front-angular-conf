import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from '../../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class DadosModelService {

  private usuario = new BehaviorSubject<Usuario | null>(null);

  constructor() { }

  setUsuario(user: Usuario): void {
    this.usuario.next(user);
  }

  getUsuario(): Observable<Usuario | null> {
    return this.usuario.asObservable();
  }

}
