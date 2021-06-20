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

  public progressBarreValue : number = 10;
  public lastUpdate :number=0;
  public intervalle :number =50;
  public prixSuivant :number;

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

    }, this.product.vitesse);
  }

  updatePrix(){
      this.prixSuivant = this.product.cout;
  }

  achatProduit(){
    this.product.quantite=this.product.quantite+1;
  }


  calcScore(){
    /*let date: Date = new Date();
    if(this.product.timeleft-(this.lastUpdate-date.getTime())==0){
      this.product.quantite=this.product.quantite+1;
    }*/
  }



  ngOnInit(): void {
    setTimeout(() => {this.updatePrix();},50);
    setInterval(() => { this.calcScore(); }, 50);

  }

}
