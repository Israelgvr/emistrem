import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, ViewEncapsulation } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { UploadedVideoData, VideoStatus } from "./upload-video.types";
import { NgxFileDropEntry } from "ngx-file-drop";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CoursesService } from "../course.service";
import { finalize } from "rxjs";

@Component({
    selector: 'upload-video',
    templateUrl: './upload-video.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadVideoDialog implements OnInit
{
    isUploading : boolean = false;
    files: NgxFileDropEntry[] = [];
    fileUploaded : boolean = false;
    selectedVideo! : VideoStatus;
    videoForm!: FormGroup;
    videoFormData!: FormData;
    videoData! : UploadedVideoData;

    statusList: VideoStatus[] = [
        {value: 'PUBLIC', viewValue: 'PUBLICO', icon: 'public'},
        {value: 'SUBSCRIPTORS', viewValue: 'SUSCRIPTORES', icon: 'supervisor_account'},
        {value: 'STUDENTS', viewValue: 'ESTUDIANTES EMI', icon: 'school'},
        {value: 'PRIVATE', viewValue: 'PRIVADO', icon: 'vpn_lock'},
    ];

    constructor(
        public dialogRef: MatDialogRef<UploadVideoDialog>,
        @Inject(MAT_DIALOG_DATA) public data: UploadedVideoData,
        private _formBuilder: FormBuilder,
        private _courseService: CoursesService,
        private _changeDetectorRef: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.videoForm = this._formBuilder.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
            videoStatus: ['', Validators.required]
        });

        this.videoFormData = new FormData();
    }

    trackByFn(index: number, item: any): any
    {
        return item.Key || index;
    }

    getStatusViewValue(value: any) {
        const status = this.statusList.find(status => status.value === value);

        return status != undefined ? status?.viewValue : 'DESCONOCIDO'
    }

    saveVideo() {
        this.isUploading = true;
        const { title, description, videoStatus } = this.videoForm.value;

        this.videoFormData.append('title', title);
        this.videoFormData.append('description', description);
        this.videoFormData.append('videoStatus', videoStatus);

        this._courseService.uploadVideo(this.videoFormData)
            .pipe(
                finalize(() => {
                    this.isUploading = false;
                    this.dialogRef.close({
                        videoId : this.videoData.videoId,
                        videoName: title,
                        videoDescription: description,
                        videoStatus: videoStatus,
                        videoUrl : this.videoData.videoUrl
                    });
                    this._changeDetectorRef.markForCheck();
                })
            )
            .subscribe(
                (response : UploadedVideoData) => {
                    this.videoData = response;
                    this._changeDetectorRef.markForCheck();
                }
            );
        this._changeDetectorRef.markForCheck();
    }

    // * File Drop * //
    public dropped(files: NgxFileDropEntry[]) {
        this.files = files;
        for (const droppedFile of files) {
    
            // Is it a file?
            if (droppedFile.fileEntry.isFile) {
                const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
                fileEntry.file((file: File) => {
                    this.fileUploaded = true;
                    this.videoFormData.append('file', file, droppedFile.relativePath);

                    /**
                     // You could upload it like this:
                    const formData = new FormData()
                    formData.append('logo', file, relativePath)
        
                    // Headers
                    const headers = new HttpHeaders({
                    'security-token': 'mytoken'
                    })
        
                    this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
                    .subscribe(data => {
                    // Sanitized logo returned from backend
                    })
                    **/
        
                });
            } else {
                const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
                console.log(droppedFile.relativePath, fileEntry);
            }
        }
    }
    
    public fileOver(event : any){
        console.log(event);
    }

    public fileLeave(event : any){
        console.log(event);
    }
}