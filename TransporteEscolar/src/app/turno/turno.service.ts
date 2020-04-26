/*Classe criada para simular a consulta de dados em uma tabela*/
import { Injectable } from '@angular/core';
import {TurnoODT} from './turnoODT';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {

  public turnos: TurnoODT[] = [{

    turno: 'Matutino',
    dtInicTurno: null,
    dtFinalTurno: null,
    horarioEmbarque: '06:00',
    horarioDesembarque: '11:00'

  },
    {
      turno: 'Vespertino',
      dtInicTurno: null,
      dtFinalTurno: null,
      horarioEmbarque: '12:00',
      horarioDesembarque: '17:30'

    },
    {
      turno: 'Noturno',
      dtInicTurno: null,
      dtFinalTurno: null,
      horarioEmbarque: '18:00',
      horarioDesembarque: '21:30'

    }
  ];

  constructor() { }

  getTurnos(): TurnoODT[] {
    return this.turnos;
  }
}
