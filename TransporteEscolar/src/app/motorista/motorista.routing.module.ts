
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MotoristaComponent} from './motorista.component';
import {MotoristaDetalheComponent} from './motoristadetalhe/motoristadetalhe.component';

//Criação da rota para formulário motorista
const motoristaRouts: Routes = [
  {path: 'motorista', component: MotoristaComponent},
  {path: 'motoristaDetalhe', component: MotoristaDetalheComponent},

];

@NgModule({
  imports: [RouterModule.forChild(motoristaRouts)], // "forChild" define como rota FILHO de app
  exports: [RouterModule]
})
export class MotoristaRoutingModule {

}
