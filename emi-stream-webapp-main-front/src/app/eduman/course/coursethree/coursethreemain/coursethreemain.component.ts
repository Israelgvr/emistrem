import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coursethreemain',
  templateUrl: './coursethreemain.component.html',
  styleUrls: ['./coursethreemain.component.scss']
})
export class CoursethreemainComponent implements OnInit {

  showCategoryActive :boolean = false;
  showLevelActive :boolean = false;

  levels: string[] = ["PRINCIPIANTE", "INTERMEDIO", "AVANZADO", "EXPERTO"]

  constructor() { }

  ngOnInit(): void {
  }

  showCategory(){
    this.showCategoryActive = !this.showCategoryActive;
  }

  showLevel(){
    this.showLevelActive = !this.showLevelActive;
  }
}
