
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AlunoComponent} from './aluno.component';
import {AlunoDetalheComponent} from './aluno-detalhe/aluno-detalhe.component';

/*Criação da rota para formulário aluno*/
const alunoRouts: Routes = [
  {path: 'aluno', component: AlunoComponent},
  {path: 'alunoDetalhe', component: AlunoDetalheComponent},
  {path: 'alunoEdit/:id', component: AlunoDetalheComponent},
];

@NgModule({
  imports: [RouterModule.forChild(alunoRouts)], /*"forChild" define como rota FILHO de app*/
  exports: [RouterModule]
})
export class AlunoRoutingModule {

}
