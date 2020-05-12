import {Component, OnInit} from '@angular/core';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {MotoristaODT} from '../motoristaODT';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {MotoristaService} from '../motorista.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Params} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-motoristadetalhe',
  templateUrl: './motoristadetalhe.component.html',
  styleUrls: ['./motoristadetalhe.component.css'],
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class MotoristaDetalheComponent implements OnInit {

  constructor(private motoristaService: MotoristaService,
              private route: ActivatedRoute,
              private fb: FormBuilder) { }

  formUsuario: FormGroup;

  private formSubmitAttempt: boolean;

  inscricao: Subscription;

  motorista: MotoristaODT;

  ngOnInit(): void {
    this.inscricao = this.route.params.subscribe(
      (params: Params) => {
        const id: number = +params.id;
        if (id) {
          this.motoristaService.getMotoristaByID(id).subscribe(dados => {
            this.motorista = dados;
            this.formUsuario = this.fb.group({     // {5}
              id: [this.motorista.id],
              nome: [this.motorista.nome, Validators.required],
              cpf: [this.motorista.cpf, Validators.required],
              telefone: [this.motorista.telefone],
              endereco: [this.motorista.email],
              email: [this.motorista.email, [Validators.required, Validators.email]],
              dataNascimento: [this.motorista.dataNascimento]
            });
            console.log(this.formUsuario);
          }, error => {console.error(error); });
        } else {
          this.motorista = {
            id: null,
            nome: '',
            cpf: '',
            telefone: '',
            endereco: '',
            dataNascimento: null,
            email: ''
          };
          this.formUsuario = this.fb.group({     // {5}
            id: [this.motorista.id],
            nome: [this.motorista.nome, Validators.required],
            cpf: [this.motorista.cpf, Validators.required],
            telefone: [this.motorista.telefone],
            endereco: [this.motorista.email],
            email: [this.motorista.email, [Validators.required, Validators.email]],
            dataNascimento: [this.motorista.dataNascimento]
          });
        }
      });
  }

  onSubmit() {
    if (this.formUsuario.valid) {
      this.motorista = (this.formUsuario.value);
      console.log(this.motorista);
      if (this.motorista.id === null) {
        this.motoristaService.saveMotorista(this.motorista);
      } else {
        this.motoristaService.updateMotorista(this.motorista);
      }
    } else {

    }
  }

  isFieldInvalid(field: string) { // {6}
    return (
      (!this.formUsuario.get(field).valid && this.formUsuario.get(field).touched) ||
      (this.formUsuario.get(field).untouched && this.formSubmitAttempt) || (this.formUsuario.get(field).errors)
    );
  }
}
