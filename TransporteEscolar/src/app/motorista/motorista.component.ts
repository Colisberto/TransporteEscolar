import {Component, OnInit, ViewChild} from '@angular/core';
import {MotoristaODT} from './motoristaODT';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter, } from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MotoristaService} from './motorista.service';
import {Router} from '@angular/router';




@Component({
  selector: 'app-motorista',
  templateUrl: './motorista.component.html',
  styleUrls: ['./motorista.component.css'],
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
export class MotoristaComponent implements OnInit {

  constructor(private motoristaService: MotoristaService,
              private router: Router) {}

  dataSource: MatTableDataSource<MotoristaODT>;
  @ViewChild
  (MatSort, {static: true}) sort: MatSort;

  displayedColumns: string[] = ['Nome', 'CPF', 'Telefone', 'Endereço'];

  motorista: MotoristaODT[];

  ngOnInit(): void {
    this.motoristaService.list().subscribe(dados => {
      this.motorista = dados;
      this.dataSource = new MatTableDataSource(this.motorista);
      this.dataSource.sort = this.sort;
    });
  }

  editar(motorista: MotoristaODT) {
    this.router.navigate(['/motorisraEdit/', motorista.id]);
  }
}
