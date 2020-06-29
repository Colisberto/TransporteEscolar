/*Classe criada para simular a consulta de dados em uma tabela*/
import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {EMPTY, Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import { TurnoODT} from './turnoODT';
import {MatSnackBar} from '@angular/material/snack-bar';
import {OnibusODT} from '../onibus/onibusODT';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {

  constructor(private snackBar: MatSnackBar,
              private http: HttpClient) {

  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

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
    return this.http.post<TurnoODT>(url, turno)
      .pipe(
        map((obj) => obj),
        catchError((e) => this.errorHandler(e))
      );
  }

  update(turma: TurnoODT): Observable<TurnoODT> {
    const url = 'http://localhost:9000/api/turno/edit';
    // @ts-ignore
    return this.http.put<TurnoODT>(url, this.turno)
      .pipe(
        map((obj) => obj),
        catchError((e) => this.errorHandler(e))
      );
  }


  delete(turno: TurnoODT): Observable<TurnoODT> {
    const url = 'http://localhost:9000/api/turno/delete/';
    // @ts-ignore
    return this.http.delete<any>(url + turno.id).pipe(
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
