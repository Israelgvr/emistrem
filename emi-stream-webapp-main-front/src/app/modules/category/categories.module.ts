import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import {MatListModule} from '@angular/material/list';
import { ListCategoryComponent } from './list-category/list-category.component';
import { DetailsCategoryComponent } from './details-category/details-category.component';
import { categoryRoute } from "./category.routing";
import { CategoryComponent } from "./category.component";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatRippleModule } from "@angular/material/core";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTooltipModule } from "@angular/material/tooltip";

@NgModule({
    declarations : [
      CategoryComponent,
      ListCategoryComponent,
      DetailsCategoryComponent
  ],
    imports : [
      CommonModule,
      RouterModule.forChild(categoryRoute),
      MatButtonModule,
      MatCheckboxModule,
      MatDividerModule,
      MatFormFieldModule,
      MatIconModule,
      MatInputModule,
      MatMenuModule,
      MatProgressBarModule,
      MatRippleModule,
      MatSelectModule,
      MatSidenavModule,
      MatTooltipModule,
      MatSnackBarModule,
      MatPaginatorModule,
      FormsModule,
      ReactiveFormsModule,
      MatListModule
    ],
    exports : [

    ]
})
export class CategoriesModule {}