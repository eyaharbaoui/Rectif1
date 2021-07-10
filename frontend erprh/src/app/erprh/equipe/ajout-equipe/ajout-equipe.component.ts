import { Component, OnInit } from '@angular/core';
import {Equipe} from "../equipe.model";
import {EquipeService} from "../equipe.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";




@Component({
  selector: 'app-ajout-equipe',
  templateUrl: './ajout-equipe.component.html',
  styleUrls: ['./ajout-equipe.component.css']
})
export class AjoutEquipeComponent implements OnInit{
  id : string = ""
  nom :string = '';
  chef_equipe : string = '';
  nb_membre : number = 0;
  


  constructor(
    private equipeService: EquipeService,
    private router : Router) {;
  }
ngOnInit() {
  
}
  
  onAddEquipe(form : NgForm) {
    const f = form;
    console.log(f);
    

    const e = new Equipe (
      form.value.nom,
      form.value.chefEquipe,
      form.value.nbMembre
  );

     console.log(e);
    this.equipeService.addEquipe(e);
    form.reset();
    //console.log(this.equipeService.getEquipes());
    this.router.navigate(['/admin/liste'])
  }
}
