import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";


import {AppComponent} from './app.component';
import {RouterModule,} from "@angular/router";
import {AppRoutingModule, routingComponents} from "./app-routing.module";
import { AjoutEquipeComponent } from './erprh/equipe/ajout-equipe/ajout-equipe.component';
import { ListeEquipeComponent } from './erprh/equipe/liste-equipe/liste-equipe.component';
import { FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    AjoutEquipeComponent,
    ListeEquipeComponent],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
