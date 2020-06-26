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
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

}
