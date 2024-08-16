
import { Route } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const appRoutes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },

  // Apps routes
  {
      path: '',
      component: LayoutComponent,
      children: [
        {
            path: 'home', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
        },
        {
            path: 'courses', loadChildren: () => import('./modules/courses/courses.module').then(m => m.CoursesModule)
        },
        {
            path: 'categories', loadChildren: () => import('./modules/category/categories.module').then(m => m.CategoriesModule)
        },
        {
            path: 'users', loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule)
        },
        {
            path: '**',
            redirectTo: 'home'
        }
      ]
  }
];
