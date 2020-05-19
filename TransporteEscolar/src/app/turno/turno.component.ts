import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {TurnoService} from './turno.service';
import {TurnoODT} from './turnoODT';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-turno',
  templateUrl: './turno.component.html',
  styleUrls: ['./turno.component.css']
})
export class TurnoComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router,
              private turnoService: TurnoService
  ) { }

  public isEditable =  false;

  dataSource: MatTableDataSource<TurnoODT>;
  @ViewChild
  (MatSort, {static: true}) sort: MatSort;

  displayedColumns: string[] = ['Data Inicial', 'Hora entrada', 'Hora Saída'];

  turno: TurnoODT[];

  ngOnInit(): void {
    this.turnoService.list().subscribe(dados => {
      this.turno = dados;
      this.dataSource = new MatTableDataSource(this.turno);
      this.dataSource.sort = this.sort;
    });
  }



  /*editar(turno: TurnoServiceODT) {
    // this.router.navigate(['/turnoEdit/:id'],
    //   {queryParams: turno});
    this.router.navigate(['/turnoEdit/', turno.id]);
  }*/
}
