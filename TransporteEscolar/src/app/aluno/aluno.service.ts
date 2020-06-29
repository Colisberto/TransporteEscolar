/*Classe criada para simular a consulta de dados em uma tabela*/
import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {EMPTY, Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import { AlunoODT} from './alunoODT';
import {MotoristaODT} from '../motorista/motoristaODT';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})

export class AlunoService {

  aluno: AlunoODT;

  constructor(private snackBar: MatSnackBar,
              private http: HttpClient) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  // Método responsavel por listar ALUNOS cadastrado no banco
  list(): Observable<AlunoODT[]> {
    const url = 'http://localhost:9000/api/aluno/all';
    return this.http.get <AlunoODT[]>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  // Método responsável por buscar ALUNO por ID
  getAlunoByID(id: number): Observable<AlunoODT> {
    const url = 'http://localhost:9000/api/aluno/get/';
    // const params = new HttpParams().set("id" = id);
    return this.http.get<AlunoODT>(url + id).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  // Método responsável por Salvar/Cadastar/Adicionar ALUNO no Banco
  saveAluno(aluno: AlunoODT): Observable<AlunoODT> {
    const url = 'http://localhost:9000/api/aluno/add';
    // @ts-ignore
    return this.http.post<AlunoODT>(url, aluno).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  // Método responsável por Alterar/Editar dados do ALUNO já cadastrado no Banco
  updateAluno(aluno: AlunoODT): Observable<AlunoODT> {
    const url = 'http://localhost:9000/api/aluno/edit';
    // @ts-ignore
    return this.http.put<AlunoODT>(url, aluno).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  // Método responsável por Excluir/Deletar ALUNO já cadastrado no Banco
  delete(aluno: AlunoODT): Observable<AlunoODT> {
    const url = 'http://localhost:9000/api/aluno/delete/';
    // @ts-ignore
    return this.http.delete<any>(url + aluno.id).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage('Ocorreu um erro!', true);
    return EMPTY;
  }

  showMessage(msg: string, isError: boolean = false, ): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: isError ? ['msg-error'] : ['msg-success'],
    });
  }

}
