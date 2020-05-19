/*Classe criada para simular a consulta de dados em uma tabela*/
import {Injectable} from '@angular/core';
import {TurnoODT} from './turnoODT';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {getIifeBody} from '@angular/compiler-cli/ngcc/src/host/esm5_host';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {

  constructor(private  http: HttpClient) {
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
    return this.http.get <TurnoODT>(url + id);
  }

  save(turno: TurnoODT): Observable<TurnoODT> {
    const url = 'http://localhost:9000/api/turno/add';
    // @ts-ignore
    return this.http.post<TurnoODT>(url, turno)
      .pipe(
        catchError(this.handleError)
      ).subscribe((data) => {
        console.log(data);
      });
  }

  update(turno: TurnoODT): Observable<TurnoODT> {
    const url = 'http://localhost:9000/api/turno/edit';
    // @ts-ignore
    return this.http.put<TurnoODT>(url, turno)
      .pipe(
        catchError(this.handleError)
      ).subscribe((data) => {
        console.log(data);
      });
  }

  /*delete(onibus: OnibusODT): Observable<OnibusODT> {
    const url = 'http://localhost:9000/api/onibus/delete/';
    console.log('delete', onibus);
    // @ts-ignore
    return this.http.delete<any>(url + onibus.id).pipe(
      catchError(this.handleError)
    ).subscribe((data) => {
      console.log(data);
    });
  }*/

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
