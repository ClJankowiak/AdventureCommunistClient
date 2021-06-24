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
  public revenuCumule : number;
  _qtmulti: string;
  _qtmultiNumber: number;
  _money : string;
  maxBuy: number;
  CoutMaxBuy : number;
  test:string="OK";
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
   set money(value: string) {
    this._money = value;
   }

  updateQTMulti(){
  }


  startFabrication() {
    var calculProgressBar = setInterval(() => {
        this.progressBarreValue=this.progressBarreValue+(100/(this.product.vitesse/this.intervalle));
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
    }, this.product.vitesse);
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
       this.calcMaxBuy();
     }
  }
    achatProduit()
  {
    if(this._qtmultiNumber==1){
      if(this.prixSuivant<=Number(this._money)){
        this.updatePrix();
        this.notifyAchat.emit(this.product);
        this.product.quantite=this.product.quantite+1;
        this.calcRevenuCumule();
      }
    }else if(this._qtmultiNumber==10){
      if(this.prixSuivant<=Number(this._money)){
        this.updatePrix();
        this.notifyAchat.emit(this.product);
        this.product.quantite=this.product.quantite+1;
        this.calcRevenuCumule();
      }
    }else if(this._qtmultiNumber==100){

    }

  }
  calcCoutMaxBuy(){
    this.CoutMaxBuy = this.prixSuivant;
    for(let i=0;i<=this.maxBuy;i++){
     this.CoutMaxBuy = this.CoutMaxBuy+(Math.pow(this.product.croissance,this.product.quantite+i-1));
    }
  }

  calcMaxBuy(){
    //Calcul du nombre maximum
    this.maxBuy=1-(1-this.product.croissance)*(Number(this._money)/this.prixSuivant);
    this.maxBuy = this.logbase(this.maxBuy,this.product.croissance);
    this.maxBuy = Math.floor(this.maxBuy);
    this._qtmultiNumber=this.maxBuy;
  }


  logbase(n:number, base:number){
      return Math.log(n)/Math.log(base);
  }


  calcScore(){
    /*let date: Date = new Date();
    if(this.product.timeleft-(this.lastUpdate-date.getTime())==0){
      this.product.quantite=this.product.quantite+1;
    }*/
  }
  calcRevenuCumule(){
    this.revenuCumule=this.product.revenu*this.product.quantite;
  }


  ngOnInit(): void {

    setTimeout(() => {this.calcRevenuCumule();},1);
    setInterval(() => { this.updatePrix(); }, 50);
    setInterval(() => { this.calcScore(); }, 50);
    setInterval(() => { this.calcMaxBuy(); }, 50);
    setInterval(() => { this.updateQtMax(); }, 50);
    setInterval(() => { this.managerUnlock(); }, 50);


  }

}
