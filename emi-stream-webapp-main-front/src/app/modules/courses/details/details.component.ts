import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { CoursesService } from "../course.service";
import { Course, CourseStatus, Level, Topic } from "../course.types";
import { Subject, catchError, takeUntil, throwError } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { VideoPlayerDialogComponent } from "../video-player/video-player.component";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'courses-detail',
    templateUrl: './details.component.html',
})
export class CoursesDetailsComponent implements OnInit, OnDestroy {

    course! : Course | null;
    writeReviewActive:boolean=false;
    panelOpenState = false;

    statusList: CourseStatus[] = [
        {value: 'PUBLIC', viewValue: 'PUBLICO', icon: 'public'},
        {value: 'SUBSCRIPTORS', viewValue: 'SUSCRIPTORES', icon: 'supervisor_account'},
        {value: 'STUDENTS', viewValue: 'ESTUDIANTES EMI', icon: 'school'},
        {value: 'PRIVATE', viewValue: 'PRIVADO', icon: 'vpn_lock'},
      ];
  
      levels: Level[] = [
        { value: 'BEGINNER', viewValue: 'PRINCIPIANTE', icon: 'filter_1' },
        { value: 'INTERMEDIATE', viewValue: 'INTERMEDIO', icon: 'filter_2' },
        { value: 'PROFESSIONAL', viewValue: 'PROFESIONAL', icon: 'filter_3' },
        { value: 'EXPERT', viewValue: 'EXPERTO', icon: 'filter_4' },
      ];
  

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _coursesService : CoursesService,
        private _dialog: MatDialog,
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _activatedRoute: ActivatedRoute
    ){}

    ngOnInit(): void {
        this._coursesService.course$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((course : Course | null) => {
                this.course = course;
                console.log(course);
            })
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
        
    writeReview(){
        this.writeReviewActive = !this.writeReviewActive
    }

    getStatusViewValue(value: any) {
        const status = this.statusList.find(status => status.value === value);
        return status != undefined ? status?.viewValue : 'DESCONOCIDO'
      }
      
    getStatusIcon(value: any) {
        const status = this.statusList.find(status => status.value === value);
        return status != undefined ? status?.icon : 'DESCONOCIDO'
    }

    getLevelViewValue(value: any) {
        const status = this.levels.find(status => status.value === value);
        return status != undefined ? status?.viewValue : 'DESCONOCIDO'
    }

    openVideoPlayerDialog(topic : Topic) {
        const dialogRef = this._dialog.open(VideoPlayerDialogComponent, {
          data: { 
                id : topic.id, 
                name : topic.name,
                description : topic.description,
                status: topic.status,
                url : topic.url
            },
            height: '750px',
            width: '750px',
        });
    }

    deleteCourse() {
        const key = this.course?.id ?? '';
        this._coursesService.deleteCourse(key)
            .pipe(
                catchError((error) => {
                    return throwError(error);
                })
            )
            .subscribe(() => {
                this._router.navigate(['../../'], { relativeTo: this._activatedRoute });
                this._coursesService.getCourses().subscribe();
            });
        this._changeDetectorRef.markForCheck();
    }

    editCourse() {
        this._router.navigate(['../create-edit', this.course?.id], { relativeTo: this._activatedRoute });
    }
}