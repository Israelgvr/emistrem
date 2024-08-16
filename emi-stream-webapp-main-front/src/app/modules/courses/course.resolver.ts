import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { CoursesService } from "./course.service";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { Course } from "./course.types";


@Injectable({
    providedIn: 'root'
})
export class CoursesResolver implements Resolve<any>
{
    constructor(private _coursesService: CoursesService)
    {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Course[]>
    {
        return this._coursesService.getCourses();
    }
}
@Injectable({
    providedIn: 'root'
})
export class CoursesCourseResolver implements Resolve<any>
{
    constructor(
        private _coursesService: CoursesService,
        private _router: Router
    )
    {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Course>
    {
        return this._coursesService.getCourseByKey(route.paramMap.get('id') ?? '')
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
