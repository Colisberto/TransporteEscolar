import {NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { AlunoComponent } from './aluno/aluno.component';


const appRouts: Routes = [
  { path: '', component: AlunoComponent, canActivate: [AuthGuard] }, /* define qual tela a ser carregada após Login realizado*/
  { path: 'login', component: LoginComponent } /* ao inserir o endereço a tela principal a ser carregada na rota sempre será a de login*/
];


@NgModule({
  imports: [RouterModule.forRoot(appRouts)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
