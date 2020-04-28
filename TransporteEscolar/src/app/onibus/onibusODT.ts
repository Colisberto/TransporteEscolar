import { AlunoODT} from '../aluno/alunoODT';

export interface OnibusODT{

  id: number;
  placa: string;
  modelo: string;
  qtdAcentos: string;
  anoFabricacao: string;
  alunos: AlunoODT[];
}
