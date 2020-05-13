/* Classe para criação das rotas para acesso aos formulários*/
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OnibusComponent} from './onibus.component';
import {OnibusDetalheComponent} from './onibusdetalhe/onibusdetalhe.component';
import {AuthGuard} from '../auth/auth.guard';

// Criação da rota para formulário onibus
const onibusRouts: Routes = [
  {path: 'onibus', component: OnibusComponent, canActivate: [AuthGuard]},
  {path: 'onibusDetalhe', component: OnibusDetalheComponent, canActivate: [AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forChild(onibusRouts)], // forChild" define como rota FILHO de app
  exports: [RouterModule]
})
export class OnibusRoutingModule {

}
