export class TurnoODT{

  public turno: string;
  public dtInicTurno: Date;
  public dtFinalTurno: Date;
  public horarioEmbarque: string;
  public horarioDesembarque: string;

  constructor( turno: string, dtInicTurno: Date, dtFinalTurno: Date, horarioEmbarque: string,
               horarioDesembarque: string) {

    this.turno = turno;
    this.dtInicTurno = dtInicTurno;
    this.dtFinalTurno = dtFinalTurno;
    this.horarioEmbarque = horarioEmbarque;
    this.horarioDesembarque = horarioDesembarque;

  }

}
