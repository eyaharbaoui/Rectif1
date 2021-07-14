import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from "./erprh/admin/admin.component";
import {AjoutEquipeComponent} from "./erprh/equipe/ajout-equipe/ajout-equipe.component";
import {ListeEquipeComponent} from "./erprh/equipe/liste-equipe/liste-equipe.component";

const routes: Routes = [
  {path: 'admin', component: AdminComponent, children:[
      {path: 'ajout', component: AjoutEquipeComponent},
      {path : 'liste', component: ListeEquipeComponent},
      {path : 'update/:equipeId', component: AjoutEquipeComponent}
    ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
export const routingComponents = [AdminComponent]
