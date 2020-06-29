/*Classe criada para simular a consulta de dados em uma tabela*/
import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {EMPTY, Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import { MotoristaODT} from './motoristaODT';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TurnoODT} from '../turno/turnoODT';

@Injectable({
  providedIn: 'root'
})
export class MotoristaService {

  constructor(private snackBar: MatSnackBar,
              private http: HttpClient) {

  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

 // Método responsavel por listar motoristas cadastrado no banco
  list(): Observable<MotoristaODT[]> {
    const url = 'http://localhost:9000/api/motorista/all';
    return this.http.get <MotoristaODT[]>(url);
  }

  // Método responsável por buscar Motorista por ID
  getMotoristaByID(id: number): Observable<MotoristaODT> {
    const url = 'http://localhost:9000/api/motorista/get/';
    // const params = new HttpParams().set("id" = id);
    return this.http.get<MotoristaODT>(url + id);
  }

  // Método responsável por Salvar/Cadastar/Adicionar motorista no Banco
  saveMotorista(motorista: MotoristaODT): Observable<MotoristaODT> {
    const url = 'http://localhost:9000/api/motorista/add';
    // @ts-ignore
    return this.http.post<MotoristaODT>(url, motorista)
      .pipe(
        map((obj) => obj),
        catchError((e) => this.errorHandler(e))
      );
  }

  // Método responsável por Alterar/Editar dados do motorista já cadastrado no Banco
  updateMotorista(motorista: MotoristaODT): Observable<MotoristaODT> {
    const url = 'http://localhost:9000/api/motorista/edit';
    // @ts-ignore
    return this.http.put<MotoristaODT>(url, this.motorista)
      .pipe(
        map((obj) => obj),
        catchError((e) => this.errorHandler(e))
      );
  }

  delete(motorista: MotoristaODT): Observable<MotoristaODT> {
    const url = 'http://localhost:9000/api/motorista/delete/';
    // @ts-ignore
    return this.http.delete<any>(url + motorista.id).pipe(
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
