/* Classe para criação das rotas para acesso aos formulários*/
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { ContatosComponent } from './contatos.component';


// Criação da rota para formulário turno
const contatosRouts: Routes = [
  {path: 'contatos', component: ContatosComponent},

];

@NgModule({
  imports: [RouterModule.forChild(contatosRouts)], // "forChild" define como rota FILHO de app
  exports: [RouterModule]
})
export class ContatosRoutingModule{

}
