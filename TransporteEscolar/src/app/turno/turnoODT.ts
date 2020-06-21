import {AlunoODT} from '../aluno/alunoODT';

export interface TurnoODT{

  id: number;
  turno: string;
  dtInicTurno: Date;
  dtFinalTurno: Date;
  horarioEmbarque: string;
  horarioDesembarque: string;
  alunos: AlunoODT[];
}
