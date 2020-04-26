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

  aluno: AlunoODT;

  public alunos: AlunoODT[] = [{
    id: 1,
    nome: 'Murilo',
    cpf: '111.111.111-11',
    telefone: '(62) 3222-2222',
    endereco: 'Rua 1 Centro',
    dataNascimento: null,
    email: ''
  },
    {
      id: 2,
      nome: 'Aluno2',
      cpf: '222.222.222-22',
      telefone: '(62) 3222-2222',
      endereco: 'Rua 1 Centro',
      dataNascimento: null,
      email: ''
    },
    {
      id: 3,
      nome: 'Aluno3',
      cpf: '333.333.333-33',
      telefone: '(62) 3222-2222',
      endereco: 'Rua 1 Centro',
      dataNascimento: null,
      email: ''
    }
  ];

  constructor(private http: HttpClient) {}

  // getAlunos(): AlunoDTO[] {
  //   // return this.alunos;
  //   const url = '/api/aluno/all';
  //   // return this.http.get<AlunoDTO[]>(url)
  //   //   .subscribe(resultado);
  //   this.subscribe((alunos: AlunoDTO[]) => {
  //     this.cars = cars;
  //   }
  // }

  // // Obtem todos os carros
  // getAlunos(): Observable<AlunoDTO[]> {
  //   const url = 'http://localhost:9000/aluno/all';
  //   return this.http.get<AlunoDTO[]>(url)
  //     .pipe(
  //       retry(2),
  //       catchError(this.handleError));
  // }

  list(): Observable<AlunoODT[]> {
    const url = 'http://localhost:9000/api/aluno/all';
    return this.http.get <AlunoODT[]>(url);
  }

  saveAluno(aluno: AlunoODT): Observable<AlunoODT> {
    const url = 'http://localhost:9000/api/aluno/add';
    // @ts-ignore
    return this.http.post<AlunoDTO>(url, aluno).pipe(
      catchError(this.handleError)
    ).subscribe((data) => {
      console.log(data);
    });
  }

  updateAluno(aluno: AlunoODT): Observable<AlunoODT> {
    const url = 'localhost:9000/api/aluno/edit';
    // @ts-ignore
    return this.http.post<AlunoDTO>(url, aluno).pipe(
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
