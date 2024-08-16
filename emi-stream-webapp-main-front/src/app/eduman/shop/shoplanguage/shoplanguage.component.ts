import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-shoplanguage',
  templateUrl: './shoplanguage.component.html',
  styleUrls: ['./shoplanguage.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ShoplanguageComponent implements OnInit {
  shopLanguageActive:boolean=false;
  shopLanguage(){
    if(this.shopLanguageActive==false){
      this.shopLanguageActive=true;
    }
    else {
      this.shopLanguageActive=false;
    }
  }
  constructor() { }

  ngOnInit(): void {}

}
