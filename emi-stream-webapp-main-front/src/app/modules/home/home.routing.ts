import { Route } from "@angular/router";
import { HomeComponent } from "./home.component";
import { CategoriesResolver } from "../category/category.resolver";
import { CoursesResolver } from "../courses/course.resolver";


export const homeRoutes : Route[] = [
    {
        path     : '',
        component: HomeComponent,
        resolve : {
            categories : CategoriesResolver,
            courses : CoursesResolver
        }
    }
]