import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { UntypedFormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, Subject, filter, fromEvent, takeUntil } from "rxjs";

import { MatDrawer } from "@angular/material/sidenav";
import { CategoryService } from "../category.service";
import { Category } from "../category.type";
import { DOCUMENT } from "@angular/common";

@Component({
    selector       : 'areas-list',
    templateUrl    : './list-category.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListCategoryComponent implements OnInit, OnDestroy 
{

    @ViewChild('matDrawer', { static: true }) matDrawer!: MatDrawer;

    drawerMode!: 'side' | 'over';
    selectedCategory!: Category | null;
    totalCount: number = 0;
    searchInputControl: UntypedFormControl = new UntypedFormControl();
    categories$!: Observable<Category[]>

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        @Inject(DOCUMENT) private _document: any,
        private _router: Router,
        private _categoryService: CategoryService,
    ) { }

    ngOnInit(): void {

        this.categories$ = this._categoryService.categories$;

        this._categoryService.categories$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((categories) => {
                console.log(categories);
                this.totalCount = categories.length;
            });
        
        this._categoryService.category$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((category: Category | null) => {
                this.selectedCategory = category;
                this._changeDetectorRef.markForCheck();
            });

        this.matDrawer.openedChange.subscribe((opened) => {
            if (!opened) {
                this.selectedCategory = null;
                this._changeDetectorRef.markForCheck();
            }
        });

        fromEvent<KeyboardEvent>(document, 'keydown')
            .pipe(
                takeUntil(this._unsubscribeAll),
                filter(event =>
                    (event.ctrlKey || event.metaKey) && // Ctrl or Cmd key
                    event.key === '/' // '/' key
                )
            )
            .subscribe(() => { });
    }


    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    onBackdropClicked(): void {
        this._router.navigate(['./'], { relativeTo: this._activatedRoute });
        this._changeDetectorRef.markForCheck();
    }

    trackByFn(index: number, item: any): any {
        return item.key || index;
    }

    createCategory(): void
    {
        this._router.navigate(['./000000000000'], {relativeTo: this._activatedRoute});
        this._changeDetectorRef.markForCheck();
    }
}
