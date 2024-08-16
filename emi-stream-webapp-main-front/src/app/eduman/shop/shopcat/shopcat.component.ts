import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-shopcat',
  templateUrl: './shopcat.component.html',
  styleUrls: ['./shopcat.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ShopcatComponent implements OnInit {
//cart sidebar activation start
shopCatActive:boolean=false;
shopCat(){
  if(this.shopCatActive==false){
    this.shopCatActive=true;
  }
  else {
    this.shopCatActive=false;
  }
}
//cart sidebar activation end
  constructor() {}
  ngOnInit(): void {}

}
