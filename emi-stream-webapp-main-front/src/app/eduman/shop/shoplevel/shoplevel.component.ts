import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-shoplevel',
  templateUrl: './shoplevel.component.html',
  styleUrls: ['./shoplevel.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ShoplevelComponent implements OnInit {
  shopLevelActive:boolean=false;
  shopLevel(){
    if(this.shopLevelActive==false){
      this.shopLevelActive=true;
    }
    else {
      this.shopLevelActive=false;
    }
  }
  constructor() {}

  ngOnInit(): void {}

}
