import { Injectable } from '@angular/core';
//Import du tuto
import { HttpClient } from '@angular/common/http'
import { World, Pallier, Product } from './world';

@Injectable({
  providedIn: 'root'
})
export class RestserviceService {

  constructor() { }
  //Ajout tuto
  constructor(private http: Http) { }
  //--

  //Ajout tuto
  private server : string;
  server = "http://localhost:8080/";
  private user : string;

  get user(): string {
          return this.user;
  }
  set user(u : string){
    user = u;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
  getWorld(): Promise<World> {
    return this.http.get(this.server + "adventureisis/generic/world").toPromise().catch(this.handleError);
  };

  //--
}
