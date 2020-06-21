/*Classe criada para simular a consulta de dados em uma tabela*/
import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import { AlunoODT} from './alunoODT';

@Injectable({
  providedIn: 'root'
})

export class AlunoService {

  constructor(private http: HttpClient) {}

  aluno: AlunoODT;

  list(): Observable<AlunoODT[]> {
    const url = 'http://localhost:9000/api/aluno/all';
    return this.http.get <AlunoODT[]>(url);
  }

  getAlunoByID(id: number): Observable<AlunoODT> {
    const url = 'http://localhost:9000/api/aluno/get/';
    // const params = new HttpParams().set("id" = id);
    return this.http.get<AlunoODT>(url + id);
  }

  saveAluno(aluno: AlunoODT): Observable<AlunoODT> {
    const url = 'http://localhost:9000/api/aluno/add';
    // @ts-ignore
    return this.http.post<AlunoODT>(url, aluno).pipe(
      catchError(this.handleError)
    ).subscribe((data) => {
      console.log(data);
    });
  }

  updateAluno(aluno: AlunoODT): Observable<AlunoODT> {
    const url = 'http://localhost:9000/api/aluno/edit';
    // @ts-ignore
    return this.http.put<AlunoODT>(url, aluno).pipe(
      catchError(this.handleError)
    ).subscribe((data) => {
      console.log(data);
    });
  }


  // Manipulação de erros
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Ocorreu um erro no cliente ou na rede. Manuseie de acordo..
      console.error('An error occurred:', error.error.message);
    } else {
      // O back-end retornou um código de resposta sem êxito..
      // O corpo da resposta pode conter pistas sobre o que deu errado,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // retornar um observável com uma mensagem de erro voltada para o usuário
    return throwError(
      'Algo de errado aconteceu; por favor, tente novamente mais tarde.');
  }

}
