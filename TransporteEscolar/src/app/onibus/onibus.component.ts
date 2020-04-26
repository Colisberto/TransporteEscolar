import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {OnibusService} from './onibus.service';
import {OnibusODT} from './onibusODT';


@Component({
  selector: 'app-onibus',
  templateUrl: './onibus.component.html',
  styleUrls: ['./onibus.component.css'],
  providers: [

  ],
})

export class OnibusComponent implements OnInit {

  constructor(private onibusService: OnibusService) { }

  onibuss: OnibusODT[] = this.onibusService.getOnibus();

  onibus: OnibusODT =  {
    placa: null,
    modelo: null,
    qtdAcentos: null,
    anoFabricacao: null

  };
  displayedColumns: string[] = ['Placa', 'modelo', 'Qtd Acentos', 'Ano Fabricação'];
  dataSource = new MatTableDataSource(this.onibuss);

  @ViewChild
  (MatSort, {static: true}) sort: MatSort;

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
  }

  onSubmit(f: NgForm) {
    this.onibus = (f.value);
    console.log(this.onibus);  // { first: '', last: '' }
    console.log(f.valid);  // false
    console.log(f.value);
  }
  editar(onibus: OnibusODT) {
    console.log(onibus);
  }
}

