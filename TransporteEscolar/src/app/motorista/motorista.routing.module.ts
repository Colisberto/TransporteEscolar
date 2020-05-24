import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MotoristaComponent} from './motorista.component';
import {MotoristaDetalheComponent} from './motoristadetalhe/motoristadetalhe.component';
import {AuthGuard} from '../auth/auth.guard';


/*Criação da rota para formulário aluno*/
const motoristaRouts: Routes = [
  {path: 'motorista', component: MotoristaComponent, canActivate: [AuthGuard]},
  {path: 'motoristaDetalhe', component: MotoristaDetalheComponent, canActivate: [AuthGuard]},
  {path: 'motoristaEdit/:id', component: MotoristaDetalheComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(motoristaRouts)], /*"forChild" define como rota FILHO de app*/
  exports: [RouterModule]
})
export class MotoristaRoutingModule {

}
