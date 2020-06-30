import {AfterContentChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
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
               private  onibusService: OnibusService,
               private router: Router,
               private fb: FormBuilder,
               private changeDetectorRefs: ChangeDetectorRef) {
  }
  formOnibus: FormGroup;
  public onibus: OnibusODT;
  public salvo: boolean;

  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<any>;

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
          this.onibusService.getOnibusByID(id).subscribe(dados => {
            this.onibus = dados;
            this.formOnibus = this.fb.group({
              id: [this.onibus.onibus_id],
              placa: [this.onibus.placa, Validators.required],
              modelo: [this.onibus.modelo],
              qtdAcentos: [this.onibus.qtdAcentos],
              anoFabricacao: [this.onibus.anoFabricacao]
            });
          }, error => {console.error(error); });
        } else {
          this.onibus = {
            onibus_id: null, placa: '', modelo: '', qtdAcentos: '', anoFabricacao: '',
            alunos: [],
          };
          this.dataSource = new MatTableDataSource<AlunoODT>([]);
          this.formOnibus = this.fb.group({
            onibus_id: [this.onibus.onibus_id],
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
    if (this.formOnibus.valid) {
      this.onibus = (this.formOnibus.value);
      if (this.onibus.onibus_id === null) {
        this.onibusService.save(this.onibus).subscribe(() => {
          this.onibusService.showMessage('Onibus salvo com sucesso!', false);
          this.router.navigate(['/onibus']);
          this.formOnibus.reset();
        });
      } else {
        this.onibusService.update(this.onibus).subscribe(() => {
          this.onibusService.showMessage('Onibus atualizado com sucesso!', false);
          this.router.navigate(['/onibus']);
        });
      }
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: AlunoODT): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
  remover() {
    const valuesToRemove = this.selection.selected;

    const filteredItems = this.onibus.alunos.filter(item => !valuesToRemove.includes(item));
    this.dataSource = new MatTableDataSource<AlunoODT>(filteredItems);
    this.selection =  new SelectionModel<AlunoODT>(true, []);
    this.changeDetectorRefs.detectChanges();
    this.table.renderRows();
  }

  delete(onibus: OnibusODT) {
    this.onibusService.delete(onibus).subscribe(() => {
      this.onibusService.showMessage('Onibus deletado com sucesso!', false);
      this.router.navigate(['/onibus']);
    });
  }

  isFieldInvalid(field: string) { // {6}
    return (
      (!this.formOnibus.get(field).valid && this.formOnibus.get(field).touched) ||
      (this.formOnibus.get(field).untouched && this.formOnibus) || (this.formOnibus.get(field).errors)
    );
  }
}
