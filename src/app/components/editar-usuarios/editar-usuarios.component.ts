import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EscolaridadeHelper } from 'src/app/enums/escolaridade';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { SuccessMessageComponent } from 'src/app/snack-bar/success-message/success-message.component';
import { DadosModelService } from '../service/dados-model.service';
import { Usuario } from './../../models/usuario';
import * as moment from 'moment';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';

@Component({
  selector: 'app-editar-usuarios',
  templateUrl: './editar-usuarios.component.html',
  styleUrls: ['./editar-usuarios.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],

})
export class EditarUsuariosComponent implements OnInit {
  maxDate: Date = new Date();
  escolaridades = new EscolaridadeHelper().obtemEnum();
  id?: number;

  profileForm = this.formBuilder.group({
    nome: ['', [Validators.required]],
    sobrenome: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    dataNascimento: new FormControl<moment.Moment | null>(null, [Validators.required]),
    escolaridade: [0, [Validators.required]],
  });

  constructor(private formBuilder: FormBuilder, private usuarioService: UsuariosService,
    private snackBar: MatSnackBar, private router: Router, private dadosModelService: DadosModelService) {

  }

  ngOnInit(): void {
    this.dadosModelService.getUsuario().subscribe(usuario => {
      if (!usuario) this.router.navigate(['/lista-usuarios']);

      if (usuario) {
        this.id = usuario.id;
        const data = new Date(usuario.dataNascimento);
        const dataMoment = moment(data);

        this.profileForm.patchValue(
          {
            'nome': usuario.nome,
            'sobrenome': usuario.sobrenome,
            'email': usuario.email,
            'dataNascimento': dataMoment,
            'escolaridade': usuario.escolaridade
          }
        )
      }
    })
  }

  obtemEscolaridade = (escolaridade: number) => new EscolaridadeHelper().obtemDescricaoEnum(escolaridade);

  criarUsuario() {
    const data = this.profileForm.get('dataNascimento')?.value;

    const usuario = {
      id: this.id,
      nome: this.profileForm.get('nome')?.value,
      sobrenome: this.profileForm.get('sobrenome')?.value,
      email: this.profileForm.get('email')?.value,
      dataNascimento: data?.toISOString(),
      escolaridade: +(this.profileForm.get('escolaridade')?.value || ''),
    } as Usuario;

    this.usuarioService.editarUsuario(usuario).subscribe(() => {
      this.router.navigate(['/lista-usuarios']);

      this.snackBar.openFromComponent(SuccessMessageComponent, {
        duration: 6000,
      });
    })
  }
}
