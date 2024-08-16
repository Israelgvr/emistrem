import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../../courses/course.types';
import { CoursesService } from '../../courses/course.service';

@Component({
  selector: 'app-academiccourse',
  templateUrl: './academiccourse.component.html',
  styleUrls: ['./academiccourse.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AcademiccourseComponent implements OnInit {

  courses$!: Observable<Course[]>
  
  constructor(
    private _coursesService: CoursesService
  ) { }

  ngOnInit(): void {
    this.courses$ = this._coursesService.courses$;
  }
}
