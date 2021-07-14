
import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs";
import {map} from "rxjs/operators";
import {Equipe} from "./equipe.model";


@Injectable({providedIn:'root'})
export class EquipeService {
  private equipes: Equipe[]=[];
  private equipesUpdated = new Subject<Equipe[]>();

  constructor(private http: HttpClient) {
    this.getEquipes();
  }

  getEquipes(){

    this.http.get('http://localhost:8000/equipes/').subscribe(
      (data : any)=> {
       console.log( data);
      for (let i = 0 ; i <(Object.keys(data).length) ;i++) {
        let e: Equipe = {
          nom: data[i].nom,
          chef_equipe:  data[i].chef_equipe,
          nb_membre: data[i].nb_membre,
          id: data[i]._id
        }
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

  getEquipe<Equipe>(id: string){
    const e = this.equipes.filter(e => e.id ===id)[0]
    return e;
  }

  addEquipe(equipe :Equipe){
    this.http
      .post<{message:string, equipeId: string}>('http://localhost:8000/equipes/add-equipe', equipe)
      .subscribe((responseData)=>{
        console.log(responseData.message);
        const res_id = responseData.equipeId
        equipe.id = res_id;
        this.equipes.push(equipe);
        this.equipesUpdated.next([...this.equipes]);
      });

  }

  updateEquipe(id: string , equipe :Equipe) {
    this.http.put("http://localhost:8000/equipes/update/" + id, equipe)
      .subscribe(response => {
        const updatedEquipes = [...this.equipes];
        const oldEquipeIndex = updatedEquipes.findIndex(equi => equi.id === id);
        updatedEquipes[oldEquipeIndex] = equipe;
        this.equipes= updatedEquipes;
        console.log("equipe", equipe);
        console.log("update", updatedEquipes );
        this.equipesUpdated.next([...this.equipes]);
        }
      );

  }

  deleteEquipe(id: string | undefined){
    this.http.delete("http://localhost:8000/equipes/" + id)
      .subscribe(()=>{
        console.log('Deleted');
        const updatedEquipes = this.equipes.filter(eq => eq.id !== id);
        this.equipes = updatedEquipes;
        this.equipesUpdated.next([...this.equipes]);
      });
  }

}
