/*Classe criada para simular a consulta de dados em uma tabela*/
import {Injectable} from '@angular/core';
import {OnibusODT} from './onibusODT';
import {AlunoODT} from '../aluno/alunoODT';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {EMPTY, Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class OnibusService {

  constructor(private snackBar: MatSnackBar,
              private  http: HttpClient) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };


  list(): Observable<OnibusODT[]> {
    const url = 'http://localhost:9000/api/onibus/all';
    return this.http.get <OnibusODT[]>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }


  getOnibusByID(id: number): Observable<OnibusODT> {
    const url = 'http://localhost:9000/api/onibus/get/';
    // const params = new HttpParams().set("id" = id);
    return this.http.get <OnibusODT>(url + id);
  }

  // Método POST
  save(onibus: OnibusODT): Observable<OnibusODT> {
    const url = 'http://localhost:9000/api/onibus/add';
    // @ts-ignore
    return this.http.post<OnibusODT>(url, onibus)
      .pipe(
        map((obj) => obj),
        catchError((e) => this.errorHandler(e))
      );
  }

  // Método PUT
  update(onibus: OnibusODT): Observable<OnibusODT> {
    const url = 'http://localhost:9000/api/onibus/edit';
    // @ts-ignore
    return this.http.put<OnibusODT>(url, onibus)
      .pipe(
        map((obj) => obj),
        catchError((e) => this.errorHandler(e))
      );
  }

  // Método DELETE
  delete(onibus: OnibusODT): Observable<OnibusODT> {
    const url = 'http://localhost:9000/api/onibus/delete/';
    // @ts-ignore
    return this.http.delete<any>(url + onibus.id).pipe(
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
