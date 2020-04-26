import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


const appRouts: Routes = [
  // {path: 'aluno', component: AlunoComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(appRouts)], // "forRoot" define como rota PAI, pricipal
  exports: [RouterModule]
})
export class AppRoutingModule {

}
