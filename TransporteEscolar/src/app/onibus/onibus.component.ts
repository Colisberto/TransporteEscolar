import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {OnibusService} from './onibus.service';
import {OnibusODT} from './onibusODT';
import { AlunoODT} from '../aluno/alunoODT';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-onibus',
  templateUrl: './onibus.component.html',
  styleUrls: ['./onibus.component.css']
})
export class OnibusComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router,
              private onibusService: OnibusService
  ) { }

  public isEditable =  false;

  dataSource: MatTableDataSource<OnibusODT>;
  @ViewChild
  (MatSort, {static: true}) sort: MatSort;

  displayedColumns: string[] = ['Placa', 'Modelo', 'Ano', 'Acentos'];

  onibus: OnibusODT[];

  ngOnInit(): void {
    this.onibusService.list().subscribe(dados => {
      this.onibus = dados;
      this.dataSource = new MatTableDataSource(this.onibus);
      this.dataSource.sort = this.sort;
    });
  }



  editar(onibus: OnibusODT) {
    // this.router.navigate(['/turmaEdit/:id'],
    //   {queryParams: turma});
    this.router.navigate(['/onibusEdit/', onibus.id]);
  }
}
