/*Classe criada para simular a consulta de dados em uma tabela*/
import { Injectable } from '@angular/core';
import {MotoristaODT} from './motoristaODT';

@Injectable({
  providedIn: 'root'
})
export class MotoristaService {

  public motoristas: MotoristaODT[] = [{
    nome: 'Motorista 01',
    cpf: '111.111.111-11',
    telefone: '(62) 3222-2222',
    email: 'teste@gmail.com',
    dataNascimento: null

  },
    {
      nome: 'Motorista 02',
      cpf: '333.333.333-33',
      telefone: '(62) 3222-2222',
      email: 'teste@gmail.com',
      dataNascimento: null

    },
    {
      nome: 'Motorista 03',
      cpf: '444.444.444-44',
      telefone: '(62) 3222-2222',
      email: 'teste@gmail.com',
      dataNascimento: null

    }
  ];

  constructor() { }

  getMotoristas(): MotoristaODT[] {
    return this.motoristas;
  }
}
