/*Classe criada para simular a consulta de dados em uma tabela*/
import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import { TurnoODT} from './turnoODT';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {

  constructor(private http: HttpClient) {}

  turno: TurnoODT;

  list(): Observable<TurnoODT[]> {
    const url = 'http://localhost:9000/api/turno/all';
    return this.http.get <TurnoODT[]>(url);
  }
  getTurnoByID(id: number): Observable<TurnoODT> {
    const url = 'http://localhost:9000/api/turno/get/';
    // const params = new HttpParams().set("id" = id);
    return this.http.get<TurnoODT>(url + id);
  }

  saveTurno(turno: TurnoODT): Observable<TurnoODT> {
    const url = 'http://localhost:9000/api/turno/add';
    // @ts-ignore
    return this.http.post<TurnoODT>(url, turno).pipe(
      catchError(this.handleError)
    ).subscribe((data) => {
      console.log(data);
    });
  }

  updateTurno(aluno: TurnoODT): Observable<TurnoODT> {
    const url = 'localhost:9000/api/turno/edit';
    // @ts-ignore
    return this.http.post<TurnoODT>(url, turno).pipe(
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
