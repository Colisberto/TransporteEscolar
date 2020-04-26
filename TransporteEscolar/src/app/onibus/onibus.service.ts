/*Classe criada para simular a consulta de dados em uma tabela*/
import { Injectable } from '@angular/core';
import {OnibusODT} from './onibusODT';

@Injectable({
  providedIn: 'root'
})
export class OnibusService {

  public onibus: OnibusODT[] = [{
    placa: 'kkk-0506',
    modelo: 'Sprint',
    qtdAcentos: '24',
    anoFabricacao: '2020'

  },
    {
      placa: 'ggg-1515',
      modelo: 'Sprint',
      qtdAcentos: '36',
      anoFabricacao: '2020'

    }
  ];

  constructor() { }

  getOnibus(): OnibusODT[] {
    return this.onibus;
  }
}
