import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatRippleModule } from "@angular/material/core";
import { MatDialogModule } from "@angular/material/dialog";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatSelectModule } from "@angular/material/select";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { RouterModule } from "@angular/router";
import { CountdownModule } from "ngx-countdown";
import { SwiperModule } from "swiper/angular";
import { CoursesComponent } from "./courses.component";
import { coursesRoutes } from "./courses.routing";
import { CoursesListComponent } from "./list/list.component";
import { CoursesDetailsComponent } from "./details/details.component";
import { CourseInstructorComponent } from "./details/courseinstructor/courseinstructor.component";
import { CoursesVideoComponent } from "./details/coursevideo/coursevideo.component";
import { CoursesReviewComponent } from "./details/coursereview/coursereview.component";
import { CoursesCurriculamComponent } from "./details/coursecurriculam/coursecurriculam.component";
import { StudentFeedbackComponent } from "./details/studentfeedback/studentfeedback.component";
import { CoursesCreateOrEditDetailsComponent } from "./create-edit/course-edit.component";
import { NgxFileDropModule } from "ngx-file-drop";
import { UploadVideoDialog } from "./upload/upload-video.component";
import { TruncatePipe } from "src/app/shared/pipes/TruncatePipe";
import {VgCoreModule} from '@videogular/ngx-videogular/core';
import {VgOverlayPlayModule} from '@videogular/ngx-videogular/overlay-play';
import {VgBufferingModule} from '@videogular/ngx-videogular/buffering';
import {VgControlsModule} from '@videogular/ngx-videogular/controls';
import { VideoPlayerDialogComponent } from "./video-player/video-player.component";

@NgModule({
    declarations : [
        CoursesComponent,
        
        CoursesListComponent,
        CoursesDetailsComponent,
        CoursesCurriculamComponent,
        CourseInstructorComponent,
        CoursesVideoComponent,
        CoursesReviewComponent,
        StudentFeedbackComponent,

        CoursesCreateOrEditDetailsComponent,
        UploadVideoDialog,
        VideoPlayerDialogComponent,

        TruncatePipe
    ],
    imports : [
        CommonModule,
        RouterModule.forChild(coursesRoutes),
        MatCheckboxModule,
        MatDialogModule,
        MatSelectModule,
        MatFormFieldModule,
        MatIconModule,
        MatButtonModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatSlideToggleModule,
        MatTooltipModule,
        MatExpansionModule,
        MatToolbarModule,
        ReactiveFormsModule,
        FormsModule,
        MatTabsModule,
        CountdownModule,
        HttpClientModule,
        SwiperModule,
        NgxFileDropModule,
        MatDialogModule,
        VgCoreModule,
        VgControlsModule,
        VgOverlayPlayModule,
        VgBufferingModule
    ],
    exports : [

    ]
})
export class CoursesModule {}