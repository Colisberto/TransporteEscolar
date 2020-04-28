import {AfterContentChecked, AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {OnibusODT} from '../onibusODT';
import {AlunoODT} from '../../aluno/alunoODT';
import {NgForm} from '@angular/forms';
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

  constructor(private route: ActivatedRoute,
              private onibusService: OnibusService,
              private router: Router) {
  }
  public onibus: OnibusODT;
  @ViewChild(MatSort,{ static: false}) sort: MatSort;
  @ViewChild(MatTable,{ static: false}) table: MatTable<any>;
  inscricao: Subscription;
  displayedColumns: string[] = ['Selecione', 'Nome', 'CPF', 'Telefone', 'Endereço', 'Nascimento'];
  dataSource: MatTableDataSource<AlunoODT>;
  selection = new SelectionModel<AlunoODT>(true, []);

  ngOnInit() {
    this.inscricao = this.route.params.subscribe(
      (params: Params) => {
        const id: number = +params.id;
        if (id) {
          this.onibusService.getOnibusByID(id).subscribe(dados => {
            this.onibus = dados;
          }, error => {console.error(error); });
        } else {
          this.onibus = {
            id: null, placa: '', modelo: '', anoFabricacao: '', qtdAcentos: '',
            alunos: [],
          };
          this.dataSource = new MatTableDataSource<AlunoODT>([]);
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
  onSubmit(f: NgForm) {
    this.onibus = (f.value);
    if (this.onibus.id === null) {
      this.onibusService.save(this.onibus);
    } else {
      this.onibusService.update(this.onibus);
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
    console.log(this.selection.selected);
    const valuesToRemove = this.selection.selected;

    const filteredItems = this.onibus.alunos.filter(item => !valuesToRemove.includes(item));
    console.log(filteredItems);
    this.dataSource = new MatTableDataSource<AlunoODT>(filteredItems);
  }

  delete(onibus: OnibusODT, f: NgForm) {
    this.onibusService.delete(onibus);
    // this.router.navigate(['/turma/']);
    //  f.setValue("");
    f.form.reset();
  }

}


