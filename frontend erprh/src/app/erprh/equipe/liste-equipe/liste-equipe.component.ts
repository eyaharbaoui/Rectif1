import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription} from "rxjs";

import {Equipe} from "../equipe.model";
import {EquipeService} from "../equipe.service";





@Component({
  selector: 'app-liste-equipe',
  templateUrl: './liste-equipe.component.html',
  styleUrls: ['./liste-equipe.component.css']
})
  export class ListeEquipeComponent implements OnInit, OnDestroy{
  equipes: Equipe[]=[];
  private equipesSub? : Subscription;

  constructor(private equipeService: EquipeService) {

  }

  ngOnInit() {
    console.log(this.equipeService.fetchEquipes());

  }
  ngOnDestroy(){
    this.equipesSub?.unsubscribe();
  }

}
