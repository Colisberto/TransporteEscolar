import {AfterContentChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {MotoristaODT} from '../motoristaODT';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {MotoristaService} from '../motorista.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {TurnoODT} from '../../turno/turnoODT';
import {OnibusODT} from '../../onibus/onibusODT';

@Component({
  selector: 'app-motoristadetalhe',
  templateUrl: './motoristadetalhe.component.html',
  styleUrls: ['./motoristadetalhe.component.css'],
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
export class MotoristaDetalheComponent implements OnInit {

  constructor( private route: ActivatedRoute,
               private motoristaService: MotoristaService,
               private router: Router,
               private fb: FormBuilder,
               private changeDetectorRefs: ChangeDetectorRef) {
}

  formMotorista: FormGroup;
  public motorista: MotoristaODT;
  public salvo: boolean;

  private formSubmitAttempt: boolean;

  inscricao: Subscription;



  ngOnInit(): void {
    this.inscricao = this.route.params.subscribe(
      (params: Params) => {
        const id: number = +params.id;
        if (id) {
          this.motoristaService.getMotoristaByID(id).subscribe(dados => {
            this.motorista = dados;
            this.formMotorista = this.fb.group({     // {5}
              id: [this.motorista.id],
              nome: [this.motorista.nome, Validators.required],
              cpf: [this.motorista.cpf, Validators.required],
              telefone: [this.motorista.telefone],
              endereco: [this.motorista.email],
              email: [this.motorista.email, [Validators.required, Validators.email]],
              dataNascimento: [this.motorista.dataNascimento]
            });
            console.log(this.formMotorista);
          }, error => {console.error(error); });
        } else {
          this.motorista = {
            id: null,
            nome: '',
            cpf: '',
            telefone: '',
            endereco: '',
            dataNascimento: null,
            email: ''
          };
          this.formMotorista = this.fb.group({     // {5}
            id: [this.motorista.id],
            nome: [this.motorista.nome, Validators.required],
            cpf: [this.motorista.cpf, Validators.required],
            telefone: [this.motorista.telefone],
            endereco: [this.motorista.email],
            email: [this.motorista.email, [Validators.required, Validators.email]],
            dataNascimento: [this.motorista.dataNascimento]
          });
        }
      });
  }

  onSubmit() {
    if (this.formMotorista.valid) {
      this.motorista = (this.formMotorista.value);
      if (this.motorista.id === null) {
        this.motoristaService.saveMotorista(this.motorista).subscribe(() => {
          this.motoristaService.showMessage('Motorista salvo com sucesso!', false);
          this.router.navigate(['/motorista']);
          this.formMotorista.reset();
        });
      } else {
        this.motoristaService.updateMotorista(this.motorista).subscribe(() => {
          this.motoristaService.showMessage('Motorista atualizado com sucesso!', false);
          this.router.navigate(['/motorista']);
        });
      }
    }
  }

  isFieldInvalid(field: string) { // {6}
    return (
      (!this.formMotorista.get(field).valid && this.formMotorista.get(field).touched) ||
      (this.formMotorista.get(field).untouched && this.formSubmitAttempt) || (this.formMotorista.get(field).errors)
    );
  }

  delete(motorista: MotoristaODT) {
    this.motoristaService.delete(motorista).subscribe(() => {
      this.motoristaService.showMessage('Motorista deletado com sucesso!', false);
      this.router.navigate(['/motorista']);
    });
  }
}
