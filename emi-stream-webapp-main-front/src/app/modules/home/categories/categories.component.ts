import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Category } from '../../category/category.type';
import { Observable } from 'rxjs';
import { CategoryService } from '../../category/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CategoriesComponent implements OnInit {

  categories$!: Observable<Category[]>
  
  constructor(
    private _categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.categories$ = this._categoryService.categories$;
  }
}
