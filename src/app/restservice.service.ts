import { Injectable } from '@angular/core';
//Import du tuto
import { HttpClient } from '@angular/common/http'
import { World, Pallier, Product } from './world';

@Injectable({
  providedIn: 'root'
})
export class RestserviceService {

  //Ajout tuto
  constructor(private http: Http) {
    this.server = "http://localhost:8080/";
    this.user="";
  }
  //--

  //Ajout tuto
  private server : string;
  private user : string;

  getuser(): string {
          return this.user;
  }
  setuser(u : string){
    this.user = u;
  }
  getServer(): string{
    return this.server;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
  getWorld(): Promise<World> {
    pathWorld : string;
    pathWorld = "adventureCOCO/generic/world";
    return this.http.get(this.server + pathWorld).toPromise().catch(this.handleError);
  };

  //--
}
