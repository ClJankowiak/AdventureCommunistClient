import { Injectable } from '@angular/core';
//Import du tuto
import { HttpClient } from '@angular/common/http';
import { HttpHeaders} from'@angular/common/http';
import { World, Pallier, Product } from './world';

@Injectable({
  providedIn: 'root'
})
export class RestserviceService {

  //Ajout tuto
  constructor(private http: HttpClient) {
    //Serveur Claire
    this.server = "http://192.168.43.80:8080/";
    this.path = "adventurecommunist/generic/";

    //Serveur Guillaume
    //this.server = "http://192.168.43.145:2612/";
    //this.path = "Marseille-Capitalist/generic/";

    this.user="";
  }
  //--

  //Ajout tuto
  private server : string;
  public user : string;
  private path : string;

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
    //pathWorld : string;
    //pathWorld = "adventurecommunist/generic/world";
    //Serveur Claire
    //return this.http.get(this.server + "adventurecommunist/generic/world").toPromise().catch(this.handleError);

    //serveur guillaume
    return this.http.get(this.server + this.path+"world").toPromise().catch(this.handleError);
  };

  setHeaders(user:string):HttpHeaders{
    var headers = new HttpHeaders({ 'X-User': user});
    return headers;
  }
  putManager(manager : Pallier) {
      this.http.put(this.server+ this.path+"manager", manager, {headers: this.setHeaders(this.user)}).toPromise();
    }

  putProduct(product : Product): Promise<Object> {
    return this.http.put(this.server+ this.path+"product", product, {headers: this.setHeaders(this.user)})
          .toPromise();
  }

  putUpgrades(upgrade : Pallier): Promise<Object> {
    return this.http.put(this.server+ this.path+"upgrade", upgrade, {headers: this.setHeaders(this.user)})
          .toPromise();
  }

  resetWorld(): Promise<Object> {
    return this.http.delete(this.server + this.path+"world").toPromise().catch(this.handleError);
    //forcer le reload dans le app component dans la méthode qui appelle reset (ou rappeler getWorld)
  }

  putAngelUpgrade(angelupgrade : Pallier): Promise<Object> {
    return this.http.put(this.server+ this.path+"angelupgrade", angelupgrade, {headers: this.setHeaders(this.user)})
              .toPromise();
  }
  //--
}
