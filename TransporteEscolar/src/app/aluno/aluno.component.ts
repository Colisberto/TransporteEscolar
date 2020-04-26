
import {Component, OnInit, ViewChild} from '@angular/core';
import {AlunoODT} from './alunoODT';
import {NgForm} from '@angular/forms';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter , MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {ActivatedRoute, Router} from '@angular/router';
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

  constructor(private route: ActivatedRoute,
              private router: Router,
              private alunoService: AlunoService
  ) { }

  public isEditable =  false;

  dataSource: MatTableDataSource<AlunoODT>;
  @ViewChild
  (MatSort, {static: true}) sort: MatSort;

  displayedColumns: string[] = ['CPF', 'Nome', 'Endereço', 'Idade'];

  alunos: AlunoODT[];

  ngOnInit(): void {
    this.alunoService.list().subscribe(dados => {
      this.alunos = dados;
      this.dataSource = new MatTableDataSource(this.alunos);
      this.dataSource.sort = this.sort;
    });
  }



  editar(turma: AlunoODT) {
    // this.router.navigate(['/turmaEdit/:id'],
    //   {queryParams: turma});
    this.router.navigate(['/turmaEdit/', turma.id]);
  }
}
