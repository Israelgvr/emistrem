import {ChangeDetectionStrategy, Component, Inject, ViewEncapsulation} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {VgApiService} from '@videogular/ngx-videogular/core';
import { Topic } from '../course.types';

@Component({
    selector: 'app-video-player',
    templateUrl: './video-player.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoPlayerDialogComponent {
    preload: string = 'auto';
    api!: VgApiService;

    constructor(
        public dialogRef: MatDialogRef<VideoPlayerDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Topic,
    ) {}

    onPlayerReady(api: VgApiService) {
        this.api = api;
    
        this.api.getDefaultMedia().subscriptions.ended.subscribe(
            () => {
                // Set the video to the beginning
                this.api.getDefaultMedia().currentTime = 0;
            }
        );
    }
}