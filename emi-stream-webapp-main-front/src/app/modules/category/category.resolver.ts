import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { CategoryService } from "./category.service";
import { Observable, catchError, throwError } from "rxjs";
import { Category } from "./category.type";

@Injectable({
    providedIn: 'root'
})
export class CategoriesResolver implements Resolve<any>
{
    constructor(private _categoriesService: CategoryService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Category[]>
    {
        return this._categoriesService.getCategories();
    }
}

@Injectable({
    providedIn: 'root'
})
export class CategoriesCategoryResolver implements Resolve<any>
{
    constructor(
        private _categoriesService: CategoryService,
        private _router: Router
    ){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Category>
    {
        return this._categoriesService.getCategoryByKey(route.paramMap.get('id') ?? '')
                .pipe(
                    catchError((error) => {
                        console.error(error);
                        // Get the parent url
                        const parentUrl = state.url.split('/').slice(0, -1).join('/');

                        // Navigate to there
                        this._router.navigateByUrl(parentUrl);

                        // Throw an error
                        return throwError(error);
                    })
                );
    }
}
