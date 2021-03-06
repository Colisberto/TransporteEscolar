import {Component, OnInit} from '@angular/core';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {AlunoODT} from '../alunoODT';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlunoService} from '../aluno.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-aluno-detalhe',
  templateUrl: './aluno-detalhe.component.html',
  styleUrls: ['./aluno-detalhe.component.css'],
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
export class AlunoDetalheComponent implements OnInit {

  constructor(private alunoService: AlunoService,
              private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder) { }

  formAluno: FormGroup;

  private formSubmitAttempt: boolean;

  inscricao: Subscription;

  aluno: AlunoODT;

  ngOnInit(): void {
    this.inscricao = this.route.params.subscribe(
      (params: Params) => {
        const id: number = +params.id;
        if (id) {
          this.alunoService.getAlunoByID(id).subscribe(dados => {
            this.aluno = dados;
            this.formAluno = this.fb.group({     // {5}
              id: [this.aluno.id],
              nome: [this.aluno.nome, Validators.required],
              cpf: [this.aluno.cpf, Validators.required],
              telefone: [this.aluno.telefone],
              endereco: [this.aluno.endereco],
              email: [this.aluno.email, [Validators.required, Validators.email]],
              dataNascimento: [this.aluno.dataNascimento]
            });
            console.log(this.formAluno);
          }, error => {console.error(error); });
        } else {
          this.aluno = {
            id: null,
            nome: '',
            cpf: '',
            telefone: '',
            endereco: '',
            dataNascimento: null,
            email: ''
          };
          this.formAluno = this.fb.group({     // {5}
            id: [this.aluno.id],
            nome: [this.aluno.nome, Validators.required],
            cpf: [this.aluno.cpf, Validators.required],
            telefone: [this.aluno.telefone],
            endereco: [this.aluno.endereco],
            email: [this.aluno.email, [Validators.required, Validators.email]],
            dataNascimento: [this.aluno.dataNascimento]
          });
        }
      });
  }

  onSubmit() {
    if (this.formAluno.valid) {
      this.aluno = (this.formAluno.value);
      if (this.aluno.id === null) {
        this.alunoService.saveAluno(this.aluno).subscribe(() => {
          this.alunoService.showMessage('Aluno salvo com sucesso!', false);
          this.router.navigate(['/aluno']);
          this.formAluno.reset();
        });
      } else {
        this.alunoService.updateAluno(this.aluno).subscribe(() => {
          this.alunoService.showMessage('Aluno atualizado com sucesso!', false);
          this.router.navigate(['/aluno']);
        });
      }
    }
  }

  delete(aluno: AlunoODT) {
    this.alunoService.delete(aluno).subscribe(() => {
      this.alunoService.showMessage('Aluno deletado com sucesso!', false);
      this.router.navigate(['/aluno']);
    });
  }

  isFieldInvalid(field: string) { // {6}
    return (
      (!this.formAluno.get(field).valid && this.formAluno.get(field).touched) ||
      (this.formAluno.get(field).untouched && this.formSubmitAttempt) || (this.formAluno.get(field).errors)
    );
  }
}
