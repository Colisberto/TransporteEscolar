/* Classe para criação das rotas para acesso aos formulários*/
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { TurnoComponent } from './turno.component';
import {AuthGuard} from '../auth/auth.guard';
import {TurnodetalheComponent} from './turnodetalhe/turnodetalhe.component';


// Criação da rota para formulário turno
const turnoRouts: Routes = [
  {path: 'turno', component: TurnoComponent},
  {path: 'turnoDetalhe', component: TurnodetalheComponent},
  {path: 'turnoEdit/:id', component: TurnodetalheComponent},

];

@NgModule({
  imports: [RouterModule.forChild(turnoRouts)], // "forChild" define como rota FILHO de app
  exports: [RouterModule]
})
export class TurnoRoutingModule{

}
