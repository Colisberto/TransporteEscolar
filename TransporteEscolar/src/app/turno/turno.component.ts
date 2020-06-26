import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {TurnoService} from './turno.service';
import {TurnoODT} from './turnoODT';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {MatTableDataSource} from '@angular/material/table';
import {OnibusODT} from '../onibus/onibusODT';
import {MatSort} from '@angular/material/sort';
import {OnibusService} from '../onibus/onibus.service';

// @ts-ignore
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

  constructor(private turnoService: TurnoService,
              private router: Router) {}

  dataSource: MatTableDataSource<TurnoODT>;
  @ViewChild
  (MatSort, {static: true}) sort: MatSort;

  displayedColumns: string[] = ['Turno', 'Inicio', 'Final', 'Embarque', 'Desembarque'];

  turno: TurnoODT[];

  ngOnInit(): void {
    this.turnoService.list().subscribe(dados => {
      this.turno = dados;
      this.dataSource = new MatTableDataSource(this.turno);
      this.dataSource.sort = this.sort;
    });
  }

  editar(turno: TurnoODT) {
    this.router.navigate(['/turnoEdit/', turno.turno_id]);
  }
}
