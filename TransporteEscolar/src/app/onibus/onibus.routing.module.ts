/* Classe para criação das rotas para acesso aos formulários*/
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OnibusComponent} from './onibus.component';
import {OnibusDetalheComponent} from './onibusdetalhe/onibusdetalhe.component';

//Criação da rota para formulário onibus
const onibusRouts: Routes = [
  {path: 'onibus', component: OnibusComponent},
  {path: 'onibusDetalhe', component: OnibusDetalheComponent},

];

@NgModule({
  imports: [RouterModule.forChild(onibusRouts)],// "forChild" define como rota FILHO de app
  exports: [RouterModule]
})
export class OnibusRoutingModule {

}
