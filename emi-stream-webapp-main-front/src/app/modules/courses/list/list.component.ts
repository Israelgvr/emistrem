import { Component, OnInit } from "@angular/core";
import { CoursesService } from "../course.service";
import { Observable } from "rxjs";
import { Course, Level } from "../course.types";
import { CategoryService } from "../../category/category.service";
import { Category } from "../../category/category.type";

@Component({
    selector: 'courses-list',
    templateUrl: './list.component.html',
})
export class CoursesListComponent implements OnInit {

    showCategoryActive: boolean = false;
    showLevelActive: boolean = false;

    courses$!: Observable<Course[]>
    categories$!: Observable<Category[]>

    levels: string[] = ["PRINCIPIANTE", "INTERMEDIO", "AVANZADO", "EXPERTO"];

    levelsList: Level[] = [
        { value: 'BEGINNER', viewValue: 'PRINCIPIANTE', icon: 'filter_1' },
        { value: 'INTERMEDIATE', viewValue: 'INTERMEDIO', icon: 'filter_2' },
        { value: 'PROFESSIONAL', viewValue: 'PROFESIONAL', icon: 'filter_3' },
        { value: 'EXPERT', viewValue: 'EXPERTO', icon: 'filter_4' },
    ];

    constructor(
        private _coursesService: CoursesService,
        private _categoriesService: CategoryService
    ) { }

    ngOnInit(): void {
        console.log("Lista de Cursos");

        this.categories$ = this._categoriesService.categories$;
        this.courses$ = this._coursesService.courses$;

        this.courses$.subscribe((response) => {
            console.log(response);
        })
    }

    showCategory() {
        this.showCategoryActive = !this.showCategoryActive;
    }

    showLevel() {
        this.showLevelActive = !this.showLevelActive;
    }

    trackByFn(index: number, item: any): any {
        return item.Key || index;
    }

    getLevelViewValue(value: any) {
        const status = this.levelsList.find(status => status.value === value);
        return status != undefined ? status?.viewValue : 'DESCONOCIDO'
    }
}  