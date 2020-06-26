import {AfterContentChecked, AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {TurnoODT} from '../turnoODT';
import {AlunoODT} from '../../aluno/alunoODT';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {TurnoService} from '../turno.service';
import {MatSort} from '@angular/material/sort';


@Component({
  selector: 'app-turno-detalhe',
  templateUrl: './turnodetalhe.component.html',
  styleUrls: ['./turnodetalhe.component.css'],
  providers: [

  ],
})
export class TurnodetalheComponent implements OnInit, AfterViewInit, AfterContentChecked {

  constructor( private route: ActivatedRoute,
               private turnoService: TurnoService,
               private router: Router,
               private fb: FormBuilder) {
  }

  formTurno: FormGroup;
  public turno: TurnoODT;
  public salvo: boolean;

  @ViewChild(MatSort, { static: false}) sort: MatSort;
  @ViewChild(MatTable, { static: false}) table: MatTable<any>;

  inscricao: Subscription;

  displayedColumns: string[] = ['Selecione', 'CPF', 'nome', 'telefone', 'endereco', 'nascimento'];
  dataSource: MatTableDataSource<AlunoODT>;
  selection = new SelectionModel<AlunoODT>(true, []);

  ngOnInit() {
    this.salvo = false;
    this.inscricao = this.route.params.subscribe(
      (params: Params) => {
        const id: number = +params.id;
        if (id) {
          this.turnoService.getTurnoByID(id).subscribe(dados => {
            this.turno = dados;
            this.formTurno = this.fb.group({
              turno_id: [this.turno.turno_id],
              turno: [this.turno.turno, Validators.required],
              dtInicTurno: [this.turno.dtInicTurno],
              dtFinalTurno: [this.turno.dtFinalTurno],
              horarioEmbarque: [this.turno.horarioEmbarque],
              horarioDesembarque: [this.turno.horarioDesembarque]
            });
          }, error => {console.error(error); });
        } else {
          this.turno = {
            turno_id: null, turno: '', dtInicTurno: null, dtFinalTurno: null,  horarioEmbarque: '',  horarioDesembarque: '',
            alunos: [],
          };
          this.dataSource = new MatTableDataSource<AlunoODT>([]);
          this.formTurno = this.fb.group({
            turno_id: [this.turno.turno_id],
            turno: [this.turno.turno],
            dtInicTurno: [this.turno.dtInicTurno],
            dtFinalTurno: [this.turno.dtFinalTurno],
            horarioEmbarque: [this.turno.horarioEmbarque],
            horarioDesembarque: [this.turno.horarioDesembarque]
          });
        }
      });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.table.dataSource = this.dataSource;
  }

  ngAfterContentChecked() {
    this.dataSource = new MatTableDataSource(this.turno.alunos);
  }
  // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }

  onSubmit() {
    this.turno = (this.formTurno.value);
    if (this.turno.turno_id === null) {
      this.turnoService.saveTurno(this.turno).subscribe(() => {
        this.turnoService.showMessage('Turno salva com sucesso!', false);
        this.router.navigate(['/turno']);
      });
    } else {
      this.turnoService.update(this.turno).subscribe(() => {
        this.turnoService.showMessage('Turno atualizada com sucesso!', false);
        this.router.navigate(['/turno']);
      });
    }
  }

  /** Se o número de elementos selecionados corresponde ao número total de linhas. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Seleciona todas as linhas se elas não estiverem todas selecionadas; caso contrário, seleção clara. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** O rótulo da caixa de seleção na linha passada */
  checkboxLabel(row?: AlunoODT): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.cpf + 1}`;
  }

  remover() {
    const valuesToRemove = this.selection.selected;

    const filteredItems = this.turno.alunos.filter(item => !valuesToRemove.includes(item));
    console.log(filteredItems);
    this.dataSource = new MatTableDataSource<AlunoODT>(filteredItems);
  }

  delete(turno: TurnoODT) {
    this.turnoService.delete(turno).subscribe(() => {
      this.turnoService.showMessage('Turno deletada com sucesso!', false);
      this.router.navigate(['/turno']);
    });
  }

  isFieldInvalid(field: string) { // {6}
    return (
      (!this.formTurno.get(field).valid && this.formTurno.get(field).touched) ||
      (this.formTurno.get(field).untouched && this.formTurno) || (this.formTurno.get(field).errors)
    );
  }
}


