import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { UsersListComponent } from "../list/list.component";
import { UsersService } from "../users.service";
import { Subject, catchError, takeUntil, throwError } from "rxjs";
import { User } from "../users.types";
import { MatDrawerToggleResult } from "@angular/material/sidenav";
import { MyErrorStatusMatcher } from "src/app/shared/error-status-matcher";

@Component({
    selector: 'users-details',
    templateUrl: './details.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersDetailsComponent implements OnInit, OnDestroy 
{
    editMode: boolean = false;
    users!: User[] | null;
    user!: User;
    userForm!: FormGroup;
    matcher = new MyErrorStatusMatcher();

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _snackBar: MatSnackBar,
        private _usersListComponent: UsersListComponent,
        private _userService: UsersService
    ) { }

    ngOnInit(): void {
        this._usersListComponent.matDrawer.open();

        this.userForm = this._formBuilder.group({
            id: [''],
            username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15),  Validators.pattern("^[a-zA-ZÀ-ú0-9 ñ '&() .,-]*$")]],
            fullName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100), Validators.pattern("^[a-zA-ZÀ-ú0-9 ñ '&() .,-]*$")]],
            phone: ['', [Validators.maxLength(50), Validators.pattern("^[0-9]*$")]],
            email: ['', [Validators.maxLength(50), Validators.email]],
            password: [''],
            status: ['active', [Validators.required]],
            roles: this._formBuilder.array([])
        });

        this._userService.users$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((Users: User[] | null) => {
                this.users = Users;
                this._changeDetectorRef.markForCheck();
            });

        this._userService.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((user: User) => {
                this._usersListComponent.matDrawer.open();
                this.user = user;
                console.log(user);
                this.userForm.patchValue(user);

                this.toggleEditMode(user.id ? false : true);
                this._changeDetectorRef.markForCheck();
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    closeDrawer(): Promise<MatDrawerToggleResult>{
        return this._usersListComponent.matDrawer.close();
    }

    toggleEditMode(editMode: boolean | null = null): void {
        if (editMode === null) {
            this.editMode = !this.editMode;
        }
        else {
            this.editMode = editMode;
        }

        if (!this.editMode && !this.user?.id) {
            this._router.navigate(['../'], { relativeTo: this._activatedRoute });
        }

        this._changeDetectorRef.markForCheck();
    }

    setStatus(status : string): void {
        this.userForm.get('status')?.setValue(status);
        this.user.status = status;
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

    updateUser(): void {
        const _update = this.userForm.getRawValue();

        if (_update.id === '') {
            this._userService.createUser(_update)
                .pipe(
                    catchError((error) => {
                        this.snackBar(error);
                        return throwError(error);
                    })
                )
                .subscribe((User) => {
                    this.user = User;
                    this.toggleEditMode(false);
                    this._router.navigate(['../', this.user.id], { relativeTo: this._activatedRoute });
                    this.snackBar('Nuevo Usuario Agregado Correctamente');
                });
        }
        else
        {
            this._userService.updateUser(_update.id, _update)
                .pipe(
                    catchError((error) => {
                        this.snackBar(error);
                        return throwError(error);
                    })
                )
                .subscribe(() => {
                    this.toggleEditMode(false);
                    this._userService.getUsers().subscribe();

                    this.snackBar('Usuario Modificado Correctamente');
                });
        }
    }

    deleteUser() {
        const key = this.user?.id ?? '';
        this._userService.deleteUser(key)
            .pipe(
                catchError((error) => {
                    return throwError(error);
                })
            )
            .subscribe(() => {
                this._router.navigate(['../'], { relativeTo: this._activatedRoute });
                this._userService.getUsers().subscribe();
            });
        this._changeDetectorRef.markForCheck();
    }
}