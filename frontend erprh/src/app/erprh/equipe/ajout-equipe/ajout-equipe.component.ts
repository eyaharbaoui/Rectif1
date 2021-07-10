import { Component, OnInit } from '@angular/core';
import {Equipe} from "../equipe.model";
import {EquipeService} from "../equipe.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";




@Component({
  selector: 'app-ajout-equipe',
  templateUrl: './ajout-equipe.component.html',
  styleUrls: ['./ajout-equipe.component.css']
})
export class AjoutEquipeComponent implements OnInit{
  id ='';
  nom = '';
  chef_equipe = '';
  nb_membre = 0;



  constructor(private  equipeService: EquipeService, private router : Router) {;
  }
ngOnInit() {

}

  onAddEquipe(form : NgForm) {
    console.log(form.value);

    const equipe = new Equipe (
      form?.value.id,
      form?.value.nom,
      form?.value.chef_equipe,
      form?.value.nb_membre
  );

     console.log(equipe);
    this.equipeService.addEquipe(equipe);
    form?.reset();
    console.log(this.equipeService.getEquipes());
    this.router.navigate(['/admin/liste'])
  }
}
