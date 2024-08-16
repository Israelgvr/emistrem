import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-checkoutmain',
  templateUrl: './checkoutmain.component.html',
  styleUrls: ['./checkoutmain.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CheckoutmainComponent implements OnInit {
panelOpenState = false;

//cart sidebar activation start
couponLoginActive:boolean=false;
couponLogin(){
  if(this.couponLoginActive==false){
    this.couponLoginActive=true;
    this.haveCouponActive=false;
    this.shipBoxInfoActive=false;
    this.cBoxInfoActive=false;
  }
  else {
    this.couponLoginActive=false;
  }
}
//cart sidebar activation end

//sign in popup activation start
haveCouponActive:boolean=false;
haveCoupon(){
  if(this.haveCouponActive==false){
    this.couponLoginActive=false;
    this.haveCouponActive=true;
    this.shipBoxInfoActive=false;
    this.cBoxInfoActive=false;
  }
  else {
    this.haveCouponActive=false;
  }
}
//sign up popup activation end

  //sign in popup activation start
  cBoxInfoActive:boolean=false;
  cBoxInfo(){
    if(this.cBoxInfoActive==false){
      this.couponLoginActive=false;
      this.cBoxInfoActive=true;
      this.couponLoginActive=false;
      this.shipBoxInfoActive=false;
    }
    else {
      this.cBoxInfoActive=false;
    }
  }
  //sign up popup activation end

  //sidebar info click activation start
  shipBoxInfoActive:boolean=false;
  shipBoxInfo(){
    if(this.shipBoxInfoActive==false){
      this.cBoxInfoActive=false;
      this.couponLoginActive=false;
      this.cBoxInfoActive=false;
      this.shipBoxInfoActive=true;
    }
    else {
      this.shipBoxInfoActive=false;
    }
  }
  //sidebar info click activation end

  constructor() { }

  ngOnInit(): void {}

}
