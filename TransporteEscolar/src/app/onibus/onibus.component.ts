import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {OnibusService} from './onibus.service';
import {OnibusODT} from './onibusODT';
import {ActivatedRoute, Router} from '@angular/router';
import {AlunoService} from '../aluno/aluno.service';
import {AlunoODT} from '../aluno/alunoODT';


@Component({
  selector: 'app-onibus',
  templateUrl: './onibus.component.html',
  styleUrls: ['./onibus.component.css']
})
export class OnibusComponent implements OnInit {

  constructor(private onibusService: OnibusService,
              private router: Router) {}

  dataSource: MatTableDataSource<OnibusODT>;
  @ViewChild
  (MatSort, {static: true}) sort: MatSort;

  displayedColumns: string[] = ['placa', 'modelo', 'ano', 'acentos', 'ações'];

  onibus: OnibusODT[];

  ngOnInit(): void {
    this.onibusService.list().subscribe(dados => {
      this.onibus = dados;
      this.dataSource = new MatTableDataSource(this.onibus);
      this.dataSource.sort = this.sort;
    });
  }

  editar(onibuss: OnibusODT) {
    this.router.navigate(['/onibusEdit/', onibuss.id]);
  }
}
