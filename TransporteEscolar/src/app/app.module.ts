
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './app.routing.module';


import {OnibusModule} from './onibus/onibus.module';
import {AlunoModule} from './aluno/aluno.module';
import {TurnoModule} from './turno/turno.module';
import {LoginModule} from './login/login.module';
import {MotoristaModule} from './motorista/motorista.module';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    FormsModule,
    AlunoModule, // Preciso importar para que as rotas sejam ativadas AlunoModule, MotoristaModule,OnibusModule,
    LoginModule,
    MotoristaModule,
    OnibusModule,
    TurnoModule,
    AppRoutingModule,
    HttpClientModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
