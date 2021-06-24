import { Component } from '@angular/core';
import { RestserviceService } from './restservice.service';
import { World, Product, Pallier } from './world';
import {MatSnackBar} from '@angular/material/snack-bar';


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
  public showAngels:boolean =false;
  public showUpgrades:boolean =false;
  public showUnlocks:boolean =false;
  public test:string="OK";
  public testNumber:number=0;
  public idCible:number=-1;
  public testBoolean :boolean=false;
  public verif:boolean;

  public qtmulti : number =1;
  public commutateurString : string ="x 1";

  constructor(private service: RestserviceService, private snackBar: MatSnackBar) {
    this.playAudio();
    this.server = service.getServer();
    service.getWorld().then(
      world => { this.world = world; }
      );
  }
  showUnlocksFunc(){
      this.showUnlocks=true;
  }
  showUpgradesFunc(){
      this.showUpgrades=true;
  }
  showManagersFunc(){
    this.showManagers=true;
  }
  showAngelsFunc(){
    this.showAngels=true;
  }
  popMessage(message : string) : void {
     this.snackBar.open(message, "", { duration : 2000 })
  }

  hireManager(manager : Pallier){
    if(Number(manager.seuil)<=Number(this.world.money)){
      manager.unlocked=true;
      if(manager.unlocked==true){
      //this.testNumber=manager.idcible+1;
          this.world.products.product[manager.idcible].managerUnlocked=true;
          this.popMessage("New challenger"+manager.name);
      }
    }
  }

  allUnlock(){
    for(let i=0;i<= this.world.allunlocks.pallier.length;i++)
    {
       this.verif=true;
       this.testBoolean=this.verif;
       for(let j=0;j<= this.world.products.product.length;j++)
       {
         if(this.world.allunlocks.pallier[i].seuil<=this.world.products.product[j].quantite)
         {
           //this.popMessage(this.world.allunlocks.pallier[i].seuil + "<="+this.world.products.product[j].quantite);
           this.verif=false;
           this.testBoolean=this.verif;
         }else
         {
           //this.popMessage("Produit OK");
         }
       }
       if(this.verif==true)
       {
         this.world.allunlocks.pallier[i].unlocked=true;
       }
    }
    //this.popMessage("tyu");
  }

  onProductionDone(P : Product){
    this.world.money=this.world.money+(P.revenu*P.quantite);
    this.updateScore(P.revenu*P.quantite);
  }
  onBuy(P : Product){
      this.world.money=this.world.money-(P.cout*Math.pow(P.croissance,P.quantite-1));
      this.allUnlock();
  }
  updateScore(N : number){
    this.world.score=this.world.score+N;
  }
  changeCommu(){
    if(this.qtmulti==1){
      this.qtmulti=10;
      this.commutateurString="x 10";
    }
    else if(this.qtmulti==10){
      this.qtmulti=100;
      this.commutateurString="x 100";
    }
    else if(this.qtmulti==100){
      this.qtmulti=0;
      this.commutateurString="Max";
    }
    else if(this.qtmulti==0){
        this.qtmulti=1;
        this.commutateurString="x 1";
    }
  }
  playAudio() {
    let audio = new Audio();
    audio.src = "../../../assets/soviet.mp3";
    //audio.src = "https://www.marxists.org/history/ussr/sounds/mp3/soviet-anthem1944.mp3";
    audio.load();
    audio.play();
    //this.test=audio.src;
  }
  //--
  applyReset(private service: RestserviceService) {
    this.resetWorld():
    service.getWorld().then(
          world => { this.world = world; }
    );
  }

}
