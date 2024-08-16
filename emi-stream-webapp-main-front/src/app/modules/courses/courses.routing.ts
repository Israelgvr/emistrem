import { Route } from "@angular/router";
import { CoursesComponent } from "./courses.component";
import { CoursesListComponent } from "./list/list.component";
import { CoursesDetailsComponent } from "./details/details.component";
import { CoursesCreateOrEditDetailsComponent } from "./create-edit/course-edit.component";
import { CoursesCourseResolver, CoursesResolver } from "./course.resolver";
import { CategoriesResolver } from "../category/category.resolver";

export const coursesRoutes : Route[] = [
    {
        path     : '',
        component: CoursesComponent,
        children: [
            {
                path: '',
                component: CoursesListComponent,
                resolve : {
                    courses : CoursesResolver,
                    categories : CategoriesResolver
                }
            },
            {
                path: 'create-edit/:id',
                component: CoursesCreateOrEditDetailsComponent,
                resolve : {
                    course: CoursesCourseResolver,
                    categories : CategoriesResolver
                }
            },
            {
                path: 'detail/:id',
                component: CoursesDetailsComponent,
                resolve : {
                    courses : CoursesCourseResolver
                }
            }
        ]
    }
]