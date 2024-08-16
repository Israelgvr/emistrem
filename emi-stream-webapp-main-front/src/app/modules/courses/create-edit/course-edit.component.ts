import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidationErrors, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { NgxFileDropEntry } from "ngx-file-drop";
import { UploadVideoDialog } from "../upload/upload-video.component";
import { CourseStatus, Level } from "../course.types";
import { ActivatedRoute, Router } from "@angular/router";
import { UploadedVideoData } from "../upload/upload-video.types";
import { CoursesService } from "../course.service";
import { catchError, finalize, throwError } from "rxjs";
import { Category } from "../../category/category.type";
import { CategoryService } from "../../category/category.service";

@Component({
    selector: 'courses-edit',
    templateUrl: './course-edit.component.html',
})
export class CoursesCreateOrEditDetailsComponent implements OnInit {
    
    courseForm!: FormGroup;
    files: NgxFileDropEntry[] = [];
    panelOpenState = false;
    isThumbnailUpload = false;
    isThumbnailLoading = false;
    thumbnailUrl: string = "";
    categories: Category[] = [];

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

    get requirements() {
        return this.courseForm.get('requirements') as FormArray;
    }

    get benefits() {
        return <FormArray>this.courseForm.get('benefits');
    }

    get topics() {
      return <FormArray>this.courseForm.get('topics');
    }

    get thumbnail() {
      return <FormGroup>this.courseForm.get('thumbnail');
    }

    constructor(
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _courseService: CoursesService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        private _dialog: MatDialog,
        private _categoryService: CategoryService
    ){}

    ngOnInit(): void {
        this._categoryService.categories$
          .subscribe((categories: Category[]) =>{
            this.categories = categories;
          })

        this.courseForm = this._formBuilder.group({
            id: [''],
            title: ['', [Validators.required]],
            description: ['', Validators.required],
            benefits : this._formBuilder.array([]),
            requirements: this._formBuilder.array([]),
            level : ['', Validators.required],
            duration : ['', [ Validators.required, this.timeFormatValidator ]],
            category: ['', Validators.required],
            courseStatus : ['', Validators.required],
            certification : [false, Validators.required],
            topics : this._formBuilder.array([]),
            thumbnail : this._formBuilder.group({
              videoId : ['', Validators.required],
              videoUrl : ['', Validators.required] 
            })
        });
    }

    timeFormatValidator(control: AbstractControl): ValidationErrors | null {
      const validTimePattern = /^(0[0-9]|1[0-9]|2[0-3])h (0[0-9]|[1-5][0-9])m (0[0-9]|[1-5][0-9])s$/;
  
      if (control.value && !validTimePattern.test(control.value)) {
        return { invalidTimeFormat: true };
      }
  
      return null;
    }

    trackByFn(index: number, item: any): any
    {
        return item.Key || index;
    }

    addRequirement() {
        const requirementGroup = this._formBuilder.group({
            value: [ '', [Validators.required, Validators.minLength(3)]],
        });

        this.requirements.push(requirementGroup);

        this._changeDetectorRef.markForCheck();
    }

    removeRequirement(index: number) {
        if (this.requirements.length > 0)
            this.requirements.removeAt(index);
    }

    addBenefit() {
        const benefitGroup = this._formBuilder.group({
            value: [ '', [Validators.required, Validators.minLength(3)]],
        });

        this.benefits.push(benefitGroup);

        this._changeDetectorRef.markForCheck();
    }

    removeBenefit(index: number) {
        if (this.benefits.length > 0)
            this.benefits.removeAt(index);

        this._changeDetectorRef.markForCheck();
    }

    addTopic(newTopic: any) {
      const topicGroup = this._formBuilder.group({
          id: [ newTopic.videoId, Validators.required],
          name: [ newTopic.videoName, Validators.required ],
          description: [ newTopic.videoDescription, Validators.required ],
          status: [ newTopic.videoStatus, Validators.required ],
          url : [ newTopic.videoUrl, Validators.required ],
      });

      this.topics.push(topicGroup);

      this._changeDetectorRef.markForCheck();
    }

    removeTopic(index: number) {
      if (this.topics.length > 0) {
        var topic = this.topics.at(index).getRawValue();
        this.topics.removeAt(index);
        this._courseService.deleteVideo(topic.key).subscribe();
      }

      this._changeDetectorRef.markForCheck();
    }

    
    addThumbnail(newImg: UploadedVideoData) {
      this.thumbnail.patchValue(newImg);
      this._changeDetectorRef.markForCheck();
    }

    removeThumbnail() {
      const imgLoaded : UploadedVideoData = this.thumbnail.getRawValue();

      if (imgLoaded != null) {
        this._courseService.deleteThumbnail(imgLoaded.videoId ?? '').subscribe();
        this.thumbnail.reset();
        this.thumbnailUrl = "";
        this.isThumbnailUpload = false;
        this.files = [];
      }

      this._changeDetectorRef.markForCheck();
    }

    openUploadVideoDialog() {
      const dialogRef = this._dialog.open(UploadVideoDialog, {
        data: { key : '', videoUrl : '' },
        height: '700px',
        width: '600px',
      });

      dialogRef.afterClosed().subscribe(result => {
        this.addTopic(result);
      });
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

    closeEditMode() {
      this._router.navigate(['../detail'], { relativeTo: this._activatedRoute });
    }

    saveCourse() : void {
      const _entity = this.courseForm.getRawValue();
      console.log(this.courseForm.getRawValue());

      this._courseService.createCourse(_entity)
      .pipe(
          catchError((error) => {
              return throwError(error);
          })
      )
      .subscribe((course) => {
          this.courseForm.reset();
          this.benefits.reset();
          this.requirements.reset();
          this.topics.reset();
          this.thumbnail.reset();
          this._router.navigate(['../'], { relativeTo: this._activatedRoute });
      });
    }

    // * File Drop * //
    public dropped(files: NgxFileDropEntry[]) {
        this.files = files;
        for (const droppedFile of files) {
          if (droppedFile.fileEntry.isFile) {
            const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
            fileEntry.file((file: File) => {
    
              const thumbnailData = new FormData();
              thumbnailData.append('file', file);
              
              this._courseService.uploadThumbnail(thumbnailData)
                .pipe(
                    finalize(() => {
                        this.isThumbnailUpload = true;
                        this.isThumbnailLoading = false;
                        this._changeDetectorRef.markForCheck();
                    })
                )
                .subscribe(
                    (response : UploadedVideoData) => {
                        console.log(response);
                        this.addThumbnail(response);
                        this.isThumbnailLoading = true;
                        this.thumbnailUrl = response.videoUrl;
                        this._changeDetectorRef.markForCheck();
                    }
                );
            });
          } else {
            const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
            console.log(droppedFile.relativePath, fileEntry);
          }
        }
    }
}