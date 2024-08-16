import { Route } from "@angular/router";
import { ListCategoryComponent } from "./list-category/list-category.component";
import { DetailsCategoryComponent } from "./details-category/details-category.component";
import { CategoryComponent } from "./category.component";
import { CanDeactivateCategoryDetails } from "./category.guard";
import { CategoriesCategoryResolver, CategoriesResolver } from "./category.resolver";

export const categoryRoute : Route[] = [
    {
        path     : '',
        component: CategoryComponent,
        children: [
            {
                path: '',
                component: ListCategoryComponent,
                resolve : {
                    categories : CategoriesResolver
                }, 
                children : [
                    {
                        path: ':id',
                        component: DetailsCategoryComponent,
                        resolve : {
                            category : CategoriesCategoryResolver
                        },
                        canDeactivate : [CanDeactivateCategoryDetails]
                    }
                ]
            }
          ]
    }
]