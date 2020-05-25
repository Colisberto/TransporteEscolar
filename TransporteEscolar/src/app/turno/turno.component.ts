import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {TurnoService} from './turno.service';
import {TurnoODT} from './turnoODT';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';

// @ts-ignore
@Component({
  selector: 'app-turno',
  templateUrl: './turno.component.html',
  styleUrls: ['./turno.component.css'],
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})

export class TurnoComponent implements OnInit {

  constructor(private turnoService: TurnoService,
              private route: ActivatedRoute,
              private fb: FormBuilder
  ) { }

  formTurno: FormGroup;

  private formSubmitAttempt: boolean;

  inscricao: Subscription;

  turno: TurnoODT;

  ngOnInit(): void {
    this.inscricao = this.route.params.subscribe(
      (params: Params) => {
        const id: number = +params.id;
        if (id) {
          this.turnoService.getTurnoByID(id).subscribe(dados => {
            this.turno = dados;
            this.formTurno = this.fb.group({     // {5}
              id: [this.turno.id],
              turno: [this.turno.turno, Validators.required],
              dtInicTurno: [this.turno.dtInicTurno, Validators.required],
              dtFinalTurno: [this.turno.dtFinalTurno],
              horarioEmbarque: [this.turno.horarioEmbarque],
              horarioDesembarque:[this.turno.horarioDesembarque]
            });
            console.log(this.formTurno);
          }, error => {console.error(error); });
        } else {
          this.turno = {
            id: null,
            turno: '',
            dtInicTurno: null,
            dtFinalTurno: null,
            horarioEmbarque: '',
            horarioDesembarque: ''
          };
          this.formTurno = this.fb.group({     // {5}
            id: [this.turno.id],
            turno: [this.turno.turno, Validators.required],
            dtInicTurno: [this.turno.dtInicTurno, Validators.required],
            dtFinalTurno: [this.turno.dtFinalTurno],
            horarioEmbarque: [this.turno.horarioEmbarque],
            horarioDesembarque: [this.turno.horarioDesembarque]
          });
        }
      });
  }

  onSubmit() {
    if (this.formTurno.valid) {
      this.turno = (this.formTurno.value);
      console.log(this.turno);
      if (this.turno.id === null) {
        this.turnoService.saveTurno(this.turno);
      } else {
        this.turnoService.updateTurno(this.turno);
      }
    } else {

    }
  }

  isFieldInvalid(field: string) { // {6}
    return (
      (!this.formTurno.get(field).valid && this.formTurno.get(field).touched) ||
      (this.formTurno.get(field).untouched && this.formSubmitAttempt) || (this.formTurno.get(field).errors)
    );
  }
}
