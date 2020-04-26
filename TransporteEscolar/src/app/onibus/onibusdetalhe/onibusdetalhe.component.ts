import { Component, OnInit } from '@angular/core';
import {OnibusODT} from '../onibusODT';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-onibus-detalhe',
  templateUrl: './onibusdetalhe.component.html',
  styleUrls: ['./onibusdetalhe.component.css'],
  providers: [

  ],
})
export class OnibusDetalheComponent implements OnInit {

  constructor() { }

  onibus: OnibusODT =  {
    placa: null,
    modelo: null,
    qtdAcentos: null,
    anoFabricacao: null

  };

  ngOnInit(): void {}

  onSubmit(f: NgForm) {
    this.onibus = (f.value);
    console.log(this.onibus);  // { first: '', last: '' }
    console.log(f.valid);  // false
    console.log(f.value);
  }
}
