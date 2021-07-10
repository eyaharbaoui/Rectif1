import {Equipe} from "./equipe.model";
import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs";
import {map} from "rxjs/operators";


@Injectable({providedIn:'root'})
export class EquipeService {
  private equipes: Equipe[]=[];
  private equipesUpdated = new Subject<Equipe[]>();

  constructor(private http: HttpClient) {}

  getEquipes(){
    
    this.http.get('http://localhost:8000/equipes/').subscribe( 
      (data : any)=> {
       
      //console.log(Object.keys(data).length);
      for (let i = 0 ; i <(Object.keys(data).length) ;i++) {
        let e = new Equipe(
          data[i].nom,
          data[i].chef_equipe,
          data[i].nb_membre,
        )
        console.log(e);
        
        this.equipes.push(e);
      }
      console.log(this.equipes);
          
        }
      
    );    
  }
  fetchEquipes() {
    console.log(this.equipes);
    
    return this.equipes;
  }
  

  getEquipeUpdateListener(){
    return this.equipesUpdated.asObservable();
}

  addEquipe(equipe :Equipe){
    this.http
      .post<{message:string}>('http://localhost:8000/equipes/add-equipe', equipe)
      .subscribe((responseData)=>{
        console.log(responseData.message);
        this.equipes.push(equipe);
        this.equipesUpdated.next([...this.equipes]);
      });

  }

}
