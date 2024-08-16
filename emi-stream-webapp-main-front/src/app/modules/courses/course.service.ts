import { HttpClient, HttpEvent, HttpEventType, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, catchError, map, of, switchMap, take, tap, throwError } from "rxjs";
import { Course } from "./course.types";
import { environment } from "src/environments/environment";
import { UploadedVideoData } from "./upload/upload-video.types";

@Injectable({
    providedIn: 'root'
})
export class CoursesService
{
    private _course: BehaviorSubject<Course | null> = new BehaviorSubject<Course | null>(null);
    private _courses: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>([]);

    private _new:string = '000000000000';
    
    constructor(private _httpClient: HttpClient){}

    get courses$(): Observable<Course[]>    
    {
        return this._courses.asObservable();
    }

    get course$(): Observable<Course | null>
    {
        return this._course.asObservable();
    }

    getCourses() : Observable<Course[]>
    {
        return this._httpClient.get<Course[]>(`${environment.APIurl}/courses`)
            .pipe(
                tap((courses) => {
                    this._courses.next(courses);
                })
            )
    }

    getCourseByKey(key : string) : Observable<Course>
    {
        if(key === this._new)
        {
            const course : Course = {
                id : '',
                title: '',
                description: '',
                benefits: [],
                requirements: [],
                level: '',
                duration: '',
                category: '',
                courseStatus: '',
                certification: false,
                topics: [],
                thumbnail : {
                    videoUrl : '',
                    videoId : ''
                }
            };
            this._course.next(course);
            return of(course);
        }

        return this._courses.pipe(
            take(1),
            map((courses) => {
                const course = courses?.find(course => course.id === key) || null;
                this._course.next(course);
                return course;
            }),
            switchMap((course) => {
                if ( !course )
                {
                    return throwError(`No se pudo encontrar el curso con la clave ${key}!`);
                }
                return of(course);
            })
        );
    }

    createCourse(newCourse : Course) : Observable<Course>
    {
        const benefits = newCourse.benefits.map((benefit) => benefit.value);
        const requirements = newCourse.requirements.map((requirement) => requirement.value);
    
        const body = {
          id: newCourse.id,
          title: newCourse.title,
          description: newCourse.description,
          benefits: benefits,
          requirements: requirements,
          level: newCourse.level,
          duration: newCourse.duration,
          category: newCourse.category,
          courseStatus: newCourse.courseStatus,
          certification: newCourse.certification.toString(),
          topics: newCourse.topics,
          thumbnail: newCourse.thumbnail,
        };

        return this.courses$.pipe(
            take(1),
            switchMap(courses => this._httpClient.post<Course>(`${environment.APIurl}/courses`, body).pipe(
                map((newCourse) => {
                    console.log(newCourse);
                    this._courses.next([newCourse, ...courses]);
                    return newCourse;
                })
            ))
        );
    }

    uploadVideo(formData: any) : Observable<any> {
        const req = new HttpRequest<UploadedVideoData>('POST', `${environment.APIurl}/videos`, formData, {
            responseType: 'json'
        });

        return this._httpClient.request(req).pipe(
            map(event => {
                if (event.type === HttpEventType.Response) 
                    return <UploadedVideoData>event.body;
                
                return true;
            }),
            catchError(error => {
                console.error('Error subiendo video:', error);
                return throwError("Error al cargar el video"); 
            })
        );
    }

    uploadThumbnail(formData: any) : Observable<any> {
        const req = new HttpRequest<UploadedVideoData>('POST', `${environment.APIurl}/videos/thumbnail`, formData, {
            responseType: 'json'
        });

        return this._httpClient.request(req).pipe(
            map(event => {
                if (event.type === HttpEventType.Response) 
                    return <UploadedVideoData>event.body;

                return true;
            }),
            catchError(error => {
                console.error('Error subiendo la imagen:', error);
                return throwError("Error al cargar la imagen"); 
            })
        );
    }

    deleteVideo(key : string) : Observable<string> {
        return this._httpClient.delete(`${environment.APIurl}/videos/remove/${key}`, 
            { responseType: 'text' }
        ).pipe(
            catchError(error => {
                console.error("Error eliminando el archivo: ", error);
                return throwError(error);
            })
        );
    }

    deleteThumbnail(key : string) : Observable<string> {
        return this._httpClient.delete(`${environment.APIurl}/videos/thumbnail/remove/${key}`, 
            { responseType: 'text' }
        ).pipe(
            catchError(error => {
                console.error("Error eliminando el archivo: ", error);
                return throwError(error);
            })
        );
    }

    deleteCourse(key : string) : Observable<string> {
        return this._httpClient.delete(`${environment.APIurl}/courses/${key}`, 
            { responseType: 'text' }
        ).pipe(
            catchError(error => {
                console.error("Error eliminando el curso: ", error);
                return throwError(error);
            })
        );
    }
}