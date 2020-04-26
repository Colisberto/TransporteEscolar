/*Classe criada para simular a consulta de dados em uma tabela*/
import { Injectable } from '@angular/core';
import {AlunoODT} from './alunoODT';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  aluno: AlunoODT;

  constructor(private http: HttpClient) {
  }

  list(): Observable<AlunoODT[]>{
    const url = 'http://localhost:4200/api/aluno/all';
    return  this.http.get <AlunoODT[]>(url);

  }

    addAluno() {
    const url = '/api/aluno/add';
    }

}
