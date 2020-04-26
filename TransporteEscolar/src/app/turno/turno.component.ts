import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter , MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {TurnoODT} from './turnoODT';
import {TurnoService} from './turno.service';

@Component({
  selector: 'app-turno',
  templateUrl: './turno.component.html',
  styleUrls: ['./turno.component.css'],
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

export class TurnoComponent implements OnInit {

  constructor(private turnoService: TurnoService) { }

  turnos: TurnoODT[] = this.turnoService.getTurnos();

  turno: TurnoODT =  {

    turno: null,
    dtInicTurno: null,
    dtFinalTurno: null,
    horarioEmbarque: null,
    horarioDesembarque: null

  };
  displayedColumns: string[] = ['Turno'];
  dataSource = new MatTableDataSource(this.turnos);

  @ViewChild
  (MatSort, {static: true}) sort: MatSort;

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
  }

  onSubmit(f: NgForm) {
    this.turno = (f.value);
    console.log(this.turno);  // { first: '', last: '' }
    console.log(f.valid);  // false
    console.log(f.value);
  }
  editar(turno: TurnoODT) {
    console.log(turno);
  }
}

