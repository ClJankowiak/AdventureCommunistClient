import { Component, OnInit } from '@angular/core';
import { EventEmitter } from '@angular/core';
import {Input, Output} from '@angular/core';
import { Product } from './../world';
import {MatProgressBarModule} from '@angular/material/progress-bar'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  product: Product;
  @Input()
  set prod(value: Product) {
    this.product = value;
  }

  @Output() notifyProduction: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() notifyAchat: EventEmitter<Product> = new EventEmitter<Product>();

  public progressBarreValue : number = 10;
  public lastUpdate :number=0;
  public intervalle :number =50;
  public prixSuivant :number;
  public revenuCumule : number=0;
  public cliquable: boolean = true;
  _qtmulti: string;
  _qtmultiNumber: number;
  _money : string;
  _server:string;
  _multiplicateur:string;
  _multiplicateurVitesse:string;

  maxBuy: number;
  CoutMaxBuy : number;
  test:string="TEST";
  testN:number=0;
  public tempsRestant:number;
  //money : string;


  /*id : number;
  name : string;
  logo : string;
  cout : number;
  croissance: number;
  revenu: number;
  vitesse: number;
  quantite: number;
  timeleft: number;
  managerUnlocked: boolean;
  palliers : { "pallier" : Pallier[]};
  */


  constructor() { }


   @Input()
   set qtmulti(value: string) {
    this._qtmulti = value;
   }
   @Input()
    set server(value: string) {
     this._server = value;
    }

   @Input()
   set money(value: string) {
    this._money = value;
   }
   @Input()
    set multiplicateur(value: string) {
     this._multiplicateur = value;
    }
    @Input()
    set multiplicateurVitesse(value: string) {
     this._multiplicateurVitesse = value;
    }

  updateQTMulti(){
  }

  startFabrication() {
  this.tempsRestant=this.product.vitesse/Number(this._multiplicateurVitesse);
    if(this.cliquable==true){
      this.cliquable=false;
      var calculProgressBar = setInterval(() => {
          this.progressBarreValue=this.progressBarreValue+(100/(this.product.vitesse/Number(this._multiplicateurVitesse)/this.intervalle));
          this.tempsRestant = this.tempsRestant-this.intervalle;
        }, this.intervalle);

      setTimeout(() => {
          //this.product.quantite=this.product.quantite+1;
          clearInterval(calculProgressBar);
          this.progressBarreValue=10;
          //this.updatePrix();
          this.notifyProduction.emit(this.product);
          if(this.product.managerUnlocked==true){
                this.startFabrication();
          }
          this.tempsRestant=0;
          this.cliquable=true;
      }, this.product.vitesse/Number(this._multiplicateurVitesse));
    }
    //this.tempsRestant=0;
  }


  managerUnlock(){
    if(this.product.managerUnlocked==true && this.product.quantite!=0){
      this.startFabrication();
    }
  }

  updatePrix(){
    if(this.product.quantite==0){
      this.prixSuivant = this.product.cout;
     }else{
      this.prixSuivant = this.product.cout*Math.pow(this.product.croissance,this.product.quantite-1);
     }
  }
  updateQtMax(){
      if(this._qtmulti=="x 1"){
        this._qtmultiNumber=1;
      }else if(this._qtmulti=="x 10"){
        this._qtmultiNumber=10;
      }else if(this._qtmulti=="x 100"){
       this._qtmultiNumber=100;
     }else if(this._qtmulti=="Max"){
      this._qtmultiNumber=0;
       this.calcMaxBuy();
     }
  }
 achatProduit()
  {
    //this.updatePrix();
    this.notifyAchat.emit(this.product);
    //this.product.quantite=this.product.quantite+1;
    this.calcRevenuCumule();
    this.unlockSeuil();
  }
  calcCoutMaxBuy(){

    this.CoutMaxBuy=0;
    if(this.maxBuy==1){
    this.CoutMaxBuy = this.prixSuivant;
    }else{
      for(let i=0;i<=this.maxBuy;i++){
       this.CoutMaxBuy = this.CoutMaxBuy+(Math.pow(this.product.croissance,this.product.quantite+i-1));
      }
    }
  }

  calcMaxBuy(){
    //Calcul du nombre maximum
    this.testN=this._qtmultiNumber;
    if(this._qtmultiNumber==0){
      this.maxBuy = 1-(1-this.product.croissance)*(Number(this._money)/this.prixSuivant);
      this.maxBuy = this.logbase(this.maxBuy,this.product.croissance);
      this.maxBuy = Math.floor(this.maxBuy);
      this.calcCoutMaxBuy();
      //this._qtmultiNumber=this.maxBuy;
    }else if(this._qtmultiNumber==1){
      this.maxBuy=1;
      this.calcCoutMaxBuy();
    }else if(this._qtmultiNumber==10){
     this.maxBuy=10;
     this.calcCoutMaxBuy();
    }else if(this._qtmultiNumber==100){
      this.maxBuy=100;
      this.calcCoutMaxBuy();
    }
  }


  logbase(n:number, base:number){
      return Math.log(n)/Math.log(base);
  }
  unlockSeuil(){
     for(let i=0;i<= this.product.palliers.pallier.length;i++){
      if(this.product.palliers.pallier[i].seuil<this.product.quantite){
        this.product.palliers.pallier[i].unlocked=true;
      }
     }
  }


  calcScore(){
    /*let date: Date = new Date();
    if(this.product.timeleft-(this.lastUpdate-date.getTime())==0){
      this.product.quantite=this.product.quantite+1;
    }*/
  }
  calcRevenuCumule(){
    this.revenuCumule=this.product.revenu*this.product.quantite*Number(this._multiplicateur);
  }

  ngOnInit(): void {
    setTimeout(() => {this.calcRevenuCumule();},1);
    setInterval(() => { this.updatePrix(); }, 50);
    setInterval(() => { this.calcScore(); }, 50);
    setInterval(() => { this.calcMaxBuy(); }, 50);
    setInterval(() => { this.updateQtMax(); }, 50);
    setInterval(() => { this.managerUnlock(); }, 50);
    setInterval(() => { this.calcRevenuCumule(); }, 50);
  }

}
