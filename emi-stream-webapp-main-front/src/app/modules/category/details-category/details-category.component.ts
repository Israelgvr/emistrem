import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, catchError, takeUntil, throwError } from 'rxjs';
import { ListCategoryComponent } from '../list-category/list-category.component';
import { CategoryService } from '../category.service';
import { Category } from '../category.type';
import { MyErrorStatusMatcher } from 'src/app/shared/error-status-matcher';

@Component({
    selector: 'categories-details',
    templateUrl: './details-category.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsCategoryComponent implements OnInit, OnDestroy 
{

    editMode: boolean = false;
    categories!: Category[] | null;
    category!: Category;
    categoryForm!: FormGroup;
    matcher = new MyErrorStatusMatcher();

    icons : string[] = ['public', 'bug_report', 'build', 'store', 'shopping_cart', 'settings', 'work', 'flag', 'insert_invitation', 'report', 'attach_money', 'security', 'star_border']
    
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _snackBar: MatSnackBar,
        private _categoriesListComponent: ListCategoryComponent,
        private _categiesService: CategoryService
    ) { }


    ngOnInit(): void {
        console.log("Llego")
        this._categoriesListComponent.matDrawer.open();

        this.categoryForm = this._formBuilder.group({
            id: [''],
            title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100),  Validators.pattern("^[a-zA-ZÀ-ú0-9 ñ '&() .,-]*$")]],
            description: ['', [Validators.required, Validators.minLength(3), Validators.pattern("^[a-zA-ZÀ-ú0-9 ñ '&() .,-]*$")]],
            status: ['active', [Validators.required]],
            icon: ['', Validators.required]
        });

        this._categiesService.categories$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((categories: Category[] | null) => {
                this.categories = categories;
                this._changeDetectorRef.markForCheck();
            });

        this._categiesService.category$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((category: Category) => {
                this._categoriesListComponent.matDrawer.open();
                this.category = category;
                this.categoryForm.patchValue(category);

                this.toggleEditMode(category.id ? false : true);
                this._changeDetectorRef.markForCheck();
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }


    closeDrawer(): Promise<MatDrawerToggleResult> {
        return this._categoriesListComponent.matDrawer.close();
    }

    toggleEditMode(editMode: boolean | null = null): void {
        if (editMode === null) {
            this.editMode = !this.editMode;
        }
        else {
            this.editMode = editMode;
        }

        if (!this.editMode && !this.category?.id) {
            this._router.navigate(['../'], { relativeTo: this._activatedRoute });
        }

        this._changeDetectorRef.markForCheck();
    }

    setStatus(status : string): void {
        this.categoryForm.get('status')?.setValue(status);
        this.category.status = status;
    }

    snackBar(message : string) {
        this._snackBar.open(message, '', {
            duration: 3000,
            verticalPosition: 'bottom',
            panelClass: ['bg-blue-800', 'font-bold', 'text-gray-100']
        });
    }

    trackByFn(index: number, item: any): any
    {
        return item.Key || index;
    }

    deleteCategory() {
        const key = this.category?.id ?? '';
        this._categiesService.deleteCategory(key)
            .pipe(
                catchError((error) => {
                    return throwError(error);
                })
            )
            .subscribe(() => {
                this._router.navigate(['../'], { relativeTo: this._activatedRoute });
                this._categiesService.getCategories().subscribe();
            });
        this._changeDetectorRef.markForCheck();
    }

    updateCategory(): void {
        const _update = this.categoryForm.getRawValue();

        if (_update.id === '') {
            this._categiesService.createCategory(_update)
                .pipe(
                    catchError((error) => {
                        this.snackBar(error);
                        return throwError(error);
                    })
                )
                .subscribe((category) => {
                    this.category = category;
                    this.toggleEditMode(false);
                    this._router.navigate(['../', this.category.id], { relativeTo: this._activatedRoute });
                    this.snackBar('Nueva Categoria Agregada Correctamente');
                });
        }
        else
        {
            this._categiesService.updateCategory(_update.id, _update)
                .pipe(
                    catchError((error) => {
                        this.snackBar(error);
                        return throwError(error);
                    })
                )
                .subscribe(() => {
                    this.toggleEditMode(false);
                    this._categiesService.getCategories().subscribe();

                    this.snackBar('Usuario Modificado Correctamente');
                });
        }
    }
}
