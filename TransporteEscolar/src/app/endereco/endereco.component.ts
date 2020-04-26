import { Component, OnInit } from '@angular/core';
import { EnderecoODT } from './enderecoODT';
import { NgForm} from '@angular/forms';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.css']
})
export class EnderecoComponent implements OnInit {

  constructor() { }

  endereco: EnderecoODT =  {
    cidade: null,
    endereco: null,
    bairro: null,
    cep: null,
    uf: null,

  };

  ngOnInit(): void {
  }
  onSubmit(f: NgForm) {
    this.endereco = (f.value);
    console.log(this.endereco);  // { first: '', last: '' }
    console.log(f.valid);  // false
  }
}

