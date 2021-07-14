import { Component, OnInit } from '@angular/core';
import {Equipe} from "../equipe.model";
import {EquipeService} from "../equipe.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {NgForm} from "@angular/forms";




@Component({
  selector: 'app-ajout-equipe',
  templateUrl: './ajout-equipe.component.html',
  styleUrls: ['./ajout-equipe.component.css']
})
export class AjoutEquipeComponent implements OnInit{
  nom :string = '';
  chef_equipe : string = '';
  nb_membre : number = 0;
  private mode = '/admin/ajout';
  private  equipeId? : string;
  equipe?: Equipe;



  constructor(
    private equipeService: EquipeService,
    private router : Router,
    public route: ActivatedRoute) {}


ngOnInit() {
    this.route.paramMap.subscribe((paramMap : ParamMap)=>{
    if (paramMap.has("equipeId")) {
      this.mode = '/admin/update';
      this.equipeId = paramMap.get('equipeId')||"eya";
      // console.log("ena el id", this.equipeId);
      // console.log("" , this.equipeService.getEquipe(this.equipeId));
      this.equipe = this.equipeService.getEquipe(this.equipeId || 'eya');
    }else{
      this.mode = '/admin/ajout';
      this.equipeId = '';
    }

    });
}

  onAddEquipe(form : NgForm) {
    const f = form;
    // console.log(f);


    const e: Equipe = {
      id: this.equipe?.id,
      nom: form.value.nom,
      chef_equipe: form.value.chefEquipe,
      nb_membre: form.value.nbMembre
    };

    if (this.mode === '/admin/ajout') {
      // console.log(e);
      this.equipeService.addEquipe(e);
    } else {
      this.equipeService.updateEquipe(this.equipeId || "aaa", e);
    }
    form.reset();
    //console.log(this.equipeService.getEquipes());
    this.router.navigate(['/admin/liste'])
  }
}
