/*Classe criada para simular a consulta de dados em uma tabela*/
import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import { MotoristaODT} from './motoristaODT';

@Injectable({
  providedIn: 'root'
})
export class MotoristaService {

  constructor(private http: HttpClient) {}

  motorista: MotoristaODT;

  public motoristas: MotoristaODT[] = [{
    id: 1,
    nome: 'motorista1',
    cpf: '111.111.111-11',
    telefone: '(62) 3222-2222',
    endereco: 'Rua 1 Centro',
    dataNascimento: null,
    email: ''
  },
    {
      id: 2,
      nome: 'motorista2',
      cpf: '222.222.222-22',
      telefone: '(62) 3222-2222',
      endereco: 'Rua 1 Centro',
      dataNascimento: null,
      email: ''
    },
    {
      id: 3,
      nome: 'motorista3',
      cpf: '333.333.333-33',
      telefone: '(62) 3222-2222',
      endereco: 'Rua 1 Centro',
      dataNascimento: null,
      email: ''
    }
  ];

  getMotorista(): MotoristaODT[]{
    return (this.motoristas);
  }

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

  list(): Observable<MotoristaODT[]> {
    const url = 'http://localhost:9000/api/motorista/all';
    return this.http.get <MotoristaODT[]>(url);
  }
  getMotoristaByID(id: number): Observable<MotoristaODT> {
    const url = 'http://localhost:9000/api/motorista/get/';
    // const params = new HttpParams().set("id" = id);
    return this.http.get<MotoristaODT>(url + id);
  }

  saveMotorista(motorista: MotoristaODT): Observable<MotoristaODT> {
    const url = 'http://localhost:9000/api/motorista/add';
    // @ts-ignore
    return this.http.post<MotoristaODT>(url, motorista).pipe(
      catchError(this.handleError)
    ).subscribe((data) => {
      console.log(data);
    });
  }

  updateMotorista(motorista: MotoristaODT): Observable<MotoristaODT> {
    const url = 'localhost:9000/api/motorista/edit';
    // @ts-ignore
    return this.http.post<MotoristaODT>(url, motorista).pipe(
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
