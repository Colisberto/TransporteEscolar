import { Component, OnInit } from '@angular/core';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {AlunoODT} from '../alunoODT';
import {NgForm} from '@angular/forms';
import { AlunoService} from '../aluno.service';

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

  constructor(private alunoService: AlunoService) { }

  aluno : AlunoODT =   {
    id : null ,
    nome : null ,
    cpf : null ,
    telefone : null ,
    endereco : null ,
    dataNascimento : null ,
    email : null
  } ;

  ngOnInit(): void {}

  onSubmit(f: NgForm) {
    this.aluno = (f.value);
    if (this.aluno.id === null) {
      console.log('id null', this.aluno);
      this.alunoService.saveAluno(this.aluno);
    } else {
      this.alunoService.updateAluno(this.aluno);
    }
  }
}
