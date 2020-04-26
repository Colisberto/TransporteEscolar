import { Component, OnInit } from '@angular/core';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {AlunoODT} from '../alunoODT';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-aluno-detalhe',
  templateUrl: './aluno-detalhe.component.html',
  styleUrls: ['./aluno-detalhe.component.css'],
  providers: [
    // O código do idioma normalmente é fornecido no módulo raiz do seu aplicativo. Fazemos isso em
    // o nível do componente aqui, devido a limitações do nosso script de geração de exemplo
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
export class AlunoDetalheComponent implements OnInit {

  constructor() { }

  aluno: AlunoODT =  {
    nome: null,
    cpf: null,
    telefone: null,
    email: null,
    dataNascimento: null
  };

  ngOnInit(): void {}

  onSubmit(f: NgForm) {
    this.aluno = (f.value);
    console.log(this.aluno);  // { first: '', last: '' }
    console.log(f.valid);  // false
    console.log(f.value);
  }
}
