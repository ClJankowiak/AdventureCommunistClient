import { Component } from '@angular/core';
import { RestserviceService } from './restservice.service';
import { World, Product, Pallier } from './world';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //Ajout tuto
  public world: World = new World();
  private server: string;
  public showManagers:boolean =false;

  constructor(private service: RestserviceService) {
    this.server = service.getServer();
    service.getWorld().then(
      world => { this.world = world; }
      );
  }

  showManagersFunc(){
    this.showManagers=true;
  }
  //--

}
