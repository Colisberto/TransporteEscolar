import {AlunoODT} from '../aluno/alunoODT';

export interface TurnoODT {

  turno_id: number;
  turno: string;
  dtInicTurno: Date;
  dtFinalTurno: Date;
  horarioEmbarque: string;
  horarioDesembarque: string;
  alunos: AlunoODT[];
}
