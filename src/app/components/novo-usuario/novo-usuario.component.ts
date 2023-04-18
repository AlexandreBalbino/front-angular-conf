import { Component } from '@angular/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { UsuariosService } from '../../services/usuarios.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EscolaridadeHelper } from '../../enums/escolaridade';
import { Usuario } from '../../models/usuario';
import { SuccessMessageComponent } from '../../snack-bar/success-message/success-message.component';

@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.component.html',
  styleUrls: ['./novo-usuario.component.scss'],
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

export class NovoUsuarioComponent {
  maxDate: Date = new Date();
  escolaridades = new EscolaridadeHelper().obtemEnum();

  profileForm = this.formBuilder.group({
    nome: ['', [Validators.required]],
    sobrenome: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    dataNascimento: new FormControl<moment.Moment | null>(null, [Validators.required]),
    escolaridade: ['', [Validators.required]],
  });

  constructor(private formBuilder: FormBuilder, private usuarioService: UsuariosService,
     private snackBar: MatSnackBar, private router: Router) {
  }

  obtemEscolaridade = (escolaridade: number) => new EscolaridadeHelper().obtemDescricaoEnum(escolaridade);

  criarUsuario() {
    const data = this.profileForm.get('dataNascimento')?.value;

    const usuario = {
      nome: this.profileForm.get('nome')?.value,
      sobrenome: this.profileForm.get('sobrenome')?.value,
      email: this.profileForm.get('email')?.value,
      dataNascimento: data?.toISOString(),
      escolaridade: +(this.profileForm.get('escolaridade')?.value || ''),
    } as Usuario;

    this.usuarioService.insereUsuario(usuario).subscribe(() => {
      this.router.navigate(['/lista-usuarios']);

      this.snackBar.openFromComponent(SuccessMessageComponent, {
        duration: 6000,
      });
    })
  }
}
