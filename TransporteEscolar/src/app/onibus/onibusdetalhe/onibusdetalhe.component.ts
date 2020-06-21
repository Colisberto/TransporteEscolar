import {AfterContentChecked, AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {OnibusODT} from '../onibusODT';
import {AlunoODT} from '../../aluno/alunoODT';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {OnibusService} from '../onibus.service';
import {MatSort} from '@angular/material/sort';


@Component({
  selector: 'app-onibus-detalhe',
  templateUrl: './onibusdetalhe.component.html',
  styleUrls: ['./onibusdetalhe.component.css'],
  providers: [

  ],
})
export class OnibusDetalheComponent implements OnInit, AfterViewInit, AfterContentChecked {

  constructor( private route: ActivatedRoute,
               private onibusService: OnibusService,
               private router: Router,
               private fb: FormBuilder) {
  }

  formOnibus: FormGroup;
  public onibus: OnibusODT;
  public salvo: boolean;

  @ViewChild(MatSort, { static: false}) sort: MatSort;
  @ViewChild(MatTable, { static: false}) table: MatTable<any>;

  inscricao: Subscription;

  displayedColumns: string[] = ['Selecione', 'nome', 'cpf', 'telefone', 'endereço', 'nascimento'];
  dataSource: MatTableDataSource<AlunoODT>;
  selection = new SelectionModel<AlunoODT>(true, []);

  ngOnInit() {
    this.salvo = false;
    this.inscricao = this.route.params.subscribe(
      (params: Params) => {
        const id: number = +params.id;
        if (id) {
          this.onibusService.getOnibusByID(id).subscribe(dados => {
            this.onibus = dados;
            this.formOnibus = this.fb.group({
              id: [this.onibus.id],
              placa: [this.onibus.placa, Validators.required],
              modelo: [this.onibus.modelo],
              anoFabricacao: [this.onibus.anoFabricacao],
              qtdAcentos: [this.onibus.qtdAcentos]

            });
          }, error => {console.error(error); });
        } else {
          this.onibus = {
            id: null, placa: '', modelo: '', anoFabricacao: '', qtdAcentos: '',
            alunos: [],
          };
          this.dataSource = new MatTableDataSource<AlunoODT>([]);
          this.formOnibus = this.fb.group({
            id: [this.onibus.id],
            placa: [this.onibus.placa, Validators.required],
            modelo: [this.onibus.modelo],
            qtdAcentos: [this.onibus.qtdAcentos],
            anoFabricacao: [this.onibus.anoFabricacao]

          });
        }
      });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.table.dataSource = this.dataSource;
  }

  ngAfterContentChecked() {
    this.dataSource = new MatTableDataSource(this.onibus.alunos);
  }
  // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }

  onSubmit() {
    this.onibus = (this.formOnibus.value);
    if (this.onibus.id === null) {
      this.onibusService.save(this.onibus).subscribe(() => {
        this.onibusService.showMessage('Onibus salva com sucesso!', false);
        this.router.navigate(['/onibus']);
      });
    } else {
      this.onibusService.update(this.onibus).subscribe(() => {
        this.onibusService.showMessage('Onibus atualizada com sucesso!', false);
        this.router.navigate(['/onibus']);
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

    const filteredItems = this.onibus.alunos.filter(item => !valuesToRemove.includes(item));
    console.log(filteredItems);
    this.dataSource = new MatTableDataSource<AlunoODT>(filteredItems);
  }

  delete(onibus: OnibusODT) {
    this.onibusService.delete(onibus).subscribe(() => {
      this.onibusService.showMessage('Onibus deletada com sucesso!', false);
      this.router.navigate(['/onibus']);
    });
  }

 /* delete(onibus: OnibusODT, f: NgForm) {
    this.onibusService.delete(onibus);
    // this.router.navigate(['/turma/']);
    //  f.setValue("");
    f.form.reset(); // limpa o formulário.
  }*/


  isFieldInvalid(field: string) { // {6}
    return (
      (!this.formOnibus.get(field).valid && this.formOnibus.get(field).touched) ||
      (this.formOnibus.get(field).untouched && this.formOnibus) || (this.formOnibus.get(field).errors)
    );
  }
}


