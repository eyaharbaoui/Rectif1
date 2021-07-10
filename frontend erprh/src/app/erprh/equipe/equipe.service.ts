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
    this.http.get<{[key :string ] : Equipe }>('http://localhost:8000/api/equipes')
      .pipe(map((responseData) => {
        const equipes : Equipe[]= [];
        for (const key in responseData ) {
          if (responseData.hasOwnProperty(key)) {
            equipes.push(responseData[key]);
          }
        }
        return equipes
    })
      )
      .subscribe((equipes) => {
        this.setEquipes(equipes)
      });
  }
  fetchEquipes() {
    return this.equipes;
  }
  setEquipes(e : Equipe[]){
    this.equipes = e;

  }

  getEquipeUpdateListener(){
    return this.equipesUpdated.asObservable();
}

  addEquipe(equipe :Equipe){
    this.http
      .post<{message:string}>('http://localhost:8000/api/equipes', equipe)
      .subscribe((responseData)=>{
        console.log(responseData.message);
        this.equipes.push(equipe);
        this.equipesUpdated.next([...this.equipes]);
      });

  }

}
