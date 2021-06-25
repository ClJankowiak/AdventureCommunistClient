import { Component } from '@angular/core';
import { RestserviceService } from './restservice.service';
import { World, Product, Pallier } from './world';
import { MatSnackBar} from '@angular/material/snack-bar';
import {MatBadgeModule} from '@angular/material/badge';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //Ajout tuto
  public world: World = new World();
  public server: string;
  public showManagers:boolean =false;
  public showAngels:boolean =false;
  public showUpgrades:boolean =false;
  public showUnlocks:boolean =false;

  public test:string="OK";
  public testNumber:number=0;
  public testBoolean :boolean=false;

  public idCible:number=-1;

  public verif:boolean;
  public username:string;
  public angelReset : number=0;

  public qtmulti : number =1;
  public commutateurString : string ="x 1";

  public maxBuy: number;
  public multiplicateur : number=0;
  public multiplicateurP1 : number =1;
  public multiplicateurP2 : number =1;
  public multiplicateurP3 : number =1;
  public multiplicateurP4 : number =1;
  public multiplicateurP5 : number =1;
  public multiplicateurP6 : number =1;

  public multiplicateurVitesse : number=0;
  public multiplicateurVitesseP1 : number =1;
  public multiplicateurVitesseP2 : number =1;
  public multiplicateurVitesseP3 : number =1;
  public multiplicateurVitesseP4 : number =1;
  public multiplicateurVitesseP5 : number =1;
  public multiplicateurVitesseP6 : number =1;

  public multiplicateurAngel : number=0;
  public multiplicateurAngelP1 : number =2;
  public multiplicateurAngelP2 : number =2;
  public multiplicateurAngelP3 : number =2;
  public multiplicateurAngelP4 : number =2;
  public multiplicateurAngelP5 : number =2;
  public multiplicateurAngelP6 : number =2;





  constructor(private service: RestserviceService, private snackBar: MatSnackBar) {
    this.playAudio();
    this.server = service.getServer();
    service.getWorld().then(
      world => { this.world = world; }
      );
    this.username = localStorage.getItem("username");
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
          this.popMessage("New challenger : "+manager.name);
          this.service.putManager(manager);
      }
    }
  }
  calcAngelReset(){
    this.angelReset=150*Math.sqrt(this.world.score/Math.pow(10,15))-this.world.totalangels;
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

  onUsernameChanged(){
    localStorage.setItem("username", this.username);
    this.service.user=this.username;
  }
  achatUpgrade(upgrade : Pallier){
    if(Number(upgrade.seuil)<=Number(this.world.money)){
          upgrade.unlocked=true;
          this.world.money=this.world.money-Number(upgrade.seuil);
          this.service.putUpgrades(upgrade);
          switch(upgrade.idcible){
             case 1:{
                  if(upgrade.typeratio=="gain")
                  {
                    this.multiplicateurP1=this.multiplicateurP1*upgrade.ratio
                  }  //this.testNumber=this.multiplicateurP1;
                  if(upgrade.typeratio=="vitesse"){
                    this.multiplicateurVitesseP1=this.multiplicateurVitesseP1*upgrade.ratio;
                  }
                  if(upgrade.typeratio=="angel"){
                    this.multiplicateurAngelP1=this.multiplicateurAngelP1*upgrade.ratio;
                  }
                  break;
            }
            case 2:{
                  if(upgrade.typeratio=="gain")
                  {
                    this.multiplicateurP2=this.multiplicateurP2*upgrade.ratio
                  }  //this.testNumber=this.multiplicateurP1;
                  if(upgrade.typeratio=="vitesse"){
                    this.multiplicateurVitesseP2=this.multiplicateurVitesseP2*upgrade.ratio;
                  }
                  if(upgrade.typeratio=="angel"){
                    this.multiplicateurAngelP2=this.multiplicateurAngelP2*upgrade.ratio;
                  }
                  break;
            }
            case 3:{
                  if(upgrade.typeratio=="gain")
                  {
                    this.multiplicateurP3=this.multiplicateurP3*upgrade.ratio
                  }  //this.testNumber=this.multiplicateurP1;
                  if(upgrade.typeratio=="vitesse"){
                    this.multiplicateurVitesseP3=this.multiplicateurVitesseP3*upgrade.ratio;
                  }
                  if(upgrade.typeratio=="angel"){
                                      this.multiplicateurAngelP3=this.multiplicateurAngelP3*upgrade.ratio;
                                    }
                  break;
            }
            case 4:{
                if(upgrade.typeratio=="gain")
                {
                  this.multiplicateurP4=this.multiplicateurP4*upgrade.ratio
                }  //this.testNumber=this.multiplicateurP1;
                if(upgrade.typeratio=="vitesse"){
                  this.multiplicateurVitesseP4=this.multiplicateurVitesseP4*upgrade.ratio;
                }
                if(upgrade.typeratio=="angel"){
                                    this.multiplicateurAngelP4=this.multiplicateurAngelP4*upgrade.ratio;
                                  }
                break;
                }
                case 5:{
                if(upgrade.typeratio=="gain")
                {
                  this.multiplicateurP5=this.multiplicateurP5*upgrade.ratio
                }  //this.testNumber=this.multiplicateurP1;
                if(upgrade.typeratio=="vitesse"){
                  this.multiplicateurVitesseP5=this.multiplicateurVitesseP5*upgrade.ratio;
                }
                if(upgrade.typeratio=="angel"){
                                    this.multiplicateurAngelP5=this.multiplicateurAngelP5*upgrade.ratio;
                                  }
                break;
                }
                case 6:{
                if(upgrade.typeratio=="gain")
                {
                  this.multiplicateurP6=this.multiplicateurP6*upgrade.ratio
                }  //this.testNumber=this.multiplicateurP1;
                if(upgrade.typeratio=="vitesse"){
                  this.multiplicateurVitesseP6=this.multiplicateurVitesseP6*upgrade.ratio;
                }
                if(upgrade.typeratio=="angel"){
                                    this.multiplicateurAngelP6=this.multiplicateurAngelP6*upgrade.ratio;
                                  }
                break;
                }
          }
    }
  }
  badgeThis(liste: Pallier[])
  {
      let value = false;
      for (var pallier of liste)
      {
        if (pallier.unlocked == false && pallier.seuil <= this.world.money){
          value = true;
        }
      }
      return value;
  }
  unlockSeuil(P:Product){
     for(let i=0;i<= P.palliers.pallier.length;i++)
     {
        if(P.palliers.pallier[i].seuil<=P.quantite)
        {
            let tmp=P.palliers.pallier[i].unlocked;
            P.palliers.pallier[i].unlocked=true;
            if(tmp!=P.palliers.pallier[i].unlocked)
            {
              this.popMessage(P.palliers.pallier[i].name+ " unlocked");
                switch(P.id){
                  case 1:{
                        if(P.palliers.pallier[i].typeratio=="gain")
                        {
                          this.multiplicateurP1=this.multiplicateurP1*P.palliers.pallier[i].ratio
                        }  //this.testNumber=this.multiplicateurP1;
                        if(P.palliers.pallier[i].typeratio=="vitesse"){
                          this.multiplicateurVitesseP1=this.multiplicateurVitesseP1*P.palliers.pallier[i].ratio;
                        }
                        if(P.palliers.pallier[i].typeratio=="angel"){
                          this.multiplicateurAngelP1=this.multiplicateurAngelP1*P.palliers.pallier[i].ratio;
                        }
                        break;
                  }
                  case 2:{
                        if(P.palliers.pallier[i].typeratio=="gain")
                        {
                          this.multiplicateurP2=this.multiplicateurP2*P.palliers.pallier[i].ratio
                        }  //this.testNumber=this.multiplicateurP1;
                        if(P.palliers.pallier[i].typeratio=="vitesse"){
                          this.multiplicateurVitesseP2=this.multiplicateurVitesseP2*P.palliers.pallier[i].ratio;
                        }
                        if(P.palliers.pallier[i].typeratio=="angel"){
                                                  this.multiplicateurAngelP2=this.multiplicateurAngelP2*P.palliers.pallier[i].ratio;
                                                }
                        break;
                  }
                  case 3:{
                        if(P.palliers.pallier[i].typeratio=="gain")
                        {
                          this.multiplicateurP3=this.multiplicateurP3*P.palliers.pallier[i].ratio
                        }  //this.testNumber=this.multiplicateurP1;
                        if(P.palliers.pallier[i].typeratio=="vitesse"){
                          this.multiplicateurVitesseP3=this.multiplicateurVitesseP3*P.palliers.pallier[i].ratio;
                        }
                        if(P.palliers.pallier[i].typeratio=="angel"){
                                                                          this.multiplicateurAngelP3=this.multiplicateurAngelP3*P.palliers.pallier[i].ratio;
                                                                        }
                        break;
                  }
                  case 4:{
                        if(P.palliers.pallier[i].typeratio=="gain")
                        {
                          this.multiplicateurP4=this.multiplicateurP4*P.palliers.pallier[i].ratio
                        }  //this.testNumber=this.multiplicateurP1;
                        if(P.palliers.pallier[i].typeratio=="vitesse"){
                          this.multiplicateurVitesseP4=this.multiplicateurVitesseP4*P.palliers.pallier[i].ratio;
                        }
                        if(P.palliers.pallier[i].typeratio=="angel"){
                                                                          this.multiplicateurAngelP4=this.multiplicateurAngelP4*P.palliers.pallier[i].ratio;
                                                                        }
                        break;
                  }
                  case 5:{
                        if(P.palliers.pallier[i].typeratio=="gain")
                        {
                          this.multiplicateurP5=this.multiplicateurP5*P.palliers.pallier[i].ratio
                        }  //this.testNumber=this.multiplicateurP1;
                        if(P.palliers.pallier[i].typeratio=="vitesse"){
                          this.multiplicateurVitesseP5=this.multiplicateurVitesseP5*P.palliers.pallier[i].ratio;
                        }
                        if(P.palliers.pallier[i].typeratio=="angel"){
                                                                          this.multiplicateurAngelP5=this.multiplicateurAngelP5*P.palliers.pallier[i].ratio;
                                                                        }
                        break;
                  }
                  case 6:{
                        if(P.palliers.pallier[i].typeratio=="gain")
                        {
                          this.multiplicateurP6=this.multiplicateurP6*P.palliers.pallier[i].ratio
                        }  //this.testNumber=this.multiplicateurP1;
                        if(P.palliers.pallier[i].typeratio=="vitesse"){
                          this.multiplicateurVitesseP6=this.multiplicateurVitesseP6*P.palliers.pallier[i].ratio;
                        }
                        if(P.palliers.pallier[i].typeratio=="angel"){
                          this.multiplicateurAngelP6=this.multiplicateurAngelP6*P.palliers.pallier[i].ratio;
                        }
                        break;
                  }
                }
            }
        }
    }
  }
  calcMaxBuy(P : Product)
  {
      this.maxBuy = 1-(1-P.croissance)*(Number(this.world.money)/P.cout*Math.pow(P.croissance,P.quantite-1));
      this.maxBuy = this.logbase(this.maxBuy,P.croissance);
      this.maxBuy = Math.floor(this.maxBuy);
      //this.testNumber = this.maxBuy
  }
  onProductionDone(P : Product){
    switch(P.id){
        case 1:{
            this.multiplicateur=this.multiplicateurP1;
            break;
        }
        case 2:{
            this.multiplicateur=this.multiplicateurP2;
            break;
        }
        case 3:{
            this.multiplicateur=this.multiplicateurP3;
            break;
        }
        case 4:{
            this.multiplicateur=this.multiplicateurP4;
            break;
        }
        case 5:{
            this.multiplicateur=this.multiplicateurP5;
            break;
        }
        case 6:{
            this.multiplicateur=this.multiplicateurP6;
            break;
        }
    }
    this.testNumber=this.multiplicateur;
    this.world.money=this.world.money+(P.revenu*P.quantite*this.multiplicateur);
    this.updateScore(P.revenu*P.quantite*this.multiplicateur);
    this.service.putProduct(P);
  }
  onBuy(P : Product){
      this.achatProduit(P);
      this.service.putProduct(P);
      this.allUnlock();
      this.calcAngelReset();
  }
  achatProduit(P : Product)
  {
    //this.testNumber=this.qtmulti;
    if(this.qtmulti==1){
      if(P.cout*Math.pow(P.croissance,P.quantite-1+(1*this.qtmulti))<=Number(this.world.money)){
        this.world.money=this.world.money-(P.cout*Math.pow(P.croissance,(P.quantite-1+(1*this.qtmulti))));
        P.quantite=P.quantite+(1*this.qtmulti);
      }
    }
    if(this.qtmulti==10){
          if(P.cout*Math.pow(P.croissance,P.quantite-1+(1*this.qtmulti))<=Number(this.world.money)){
            this.world.money=this.world.money-(P.cout*Math.pow(P.croissance,(P.quantite-1+(1*this.qtmulti))));
            P.quantite=P.quantite+(1*this.qtmulti);
          }
    }
    if(this.qtmulti==100){
          if(P.cout*Math.pow(P.croissance,P.quantite-1+(1*this.qtmulti))<=Number(this.world.money)){
            this.world.money=this.world.money-(P.cout*Math.pow(P.croissance,(P.quantite-1+(1*this.qtmulti))));
            P.quantite=P.quantite+(1*this.qtmulti);
          }
    }
    if(this.qtmulti==0){
      this.calcMaxBuy(P);
      if(P.cout*Math.pow(P.croissance,P.quantite-1+(1*this.maxBuy))<=Number(this.world.money))
      {
        this.world.money=this.world.money-(P.cout*Math.pow(P.croissance,(P.quantite-1+(1*this.maxBuy))));
        P.quantite=P.quantite+(1*this.maxBuy);
      }
    }
    this.unlockSeuil(P);
  }
  logbase(n:number, base:number){
        return Math.log(n)/Math.log(base);
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
    audio.src = "../../../assets/soviet-march.mp3";
    //audio.src = "https://www.marxists.org/history/ussr/sounds/mp3/soviet-anthem1944.mp3";
    audio.load();
    audio.play();
    //this.test=audio.src;
  }

  //--
  applyReset(service: RestserviceService) {
    this.service.resetWorld();
    service.getWorld().then(
          world => { this.world = world; }
    );
  }

}
