
import {Component, OnInit, ViewChild} from '@angular/core';
import {AlunoODT} from './alunoODT';
import {NgForm} from '@angular/forms';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter , MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {AlunoService} from './aluno.service';

@Component({
  selector: 'app-aluno',
  templateUrl: './aluno.component.html',
  styleUrls: ['./aluno.component.css'],
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

export class AlunoComponent implements OnInit {

  constructor(private alunoService: AlunoService) { }

  alunos: AlunoODT[] = this.alunoService.getAlunos();

  aluno: AlunoODT =  {
    cpf: null,
    nome: null,
    email: null,
    telefone: null,
    dataNascimento: null
  };
  displayedColumns: string[] = ['Nome', 'CPF', 'Telefone', 'Endereço', 'Ações'];
  dataSource = new MatTableDataSource(this.alunos);

  @ViewChild
  (MatSort, {static: true}) sort: MatSort;//  MatSort responsável por ordenar a tabela gerada no formulário

  ngOnInit(): void {
    this.dataSource.sort = this.sort; // Ordenando a tabela
  }

  onSubmit(f: NgForm) {
    this.aluno = (f.value);
    console.log(this.aluno);  // { first: '', last: '' }
    console.log(f.valid);  // false
    console.log(f.value);
  }
  editar(aluno: AlunoODT) {
    console.log(aluno);
  }
}


