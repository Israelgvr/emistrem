import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import { fromEvent, Observable, Subject } from 'rxjs';
import { filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { UsersService } from '../users.service';
import { User } from '../users.types';

@Component({
    selector       : 'areas-list',
    templateUrl    : './list.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListComponent implements OnInit, OnDestroy
{
    @ViewChild('matDrawer', {static: true}) matDrawer!: MatDrawer;
    @ViewChild(MatPaginator) _paginator!: MatPaginator;

    users$!: Observable<User[] | null>;
    drawerMode!: 'side' | 'over';
    searchInputControl: FormControl = new FormControl();
    selectedUser!: User | null;
    isLoading: boolean = false;
    totalCount: number = 0;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        @Inject(DOCUMENT) private _document: any,
        private _router: Router,
        private _userService: UsersService
    )
    {}

    ngOnInit(): void
    {
        this.users$ = this._userService.users$;
        this._userService.users$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((users) => {
                this.totalCount = users.length;
            });

        this._userService.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((User: User | null) => {
                this.selectedUser = User;
                this._changeDetectorRef.markForCheck();
            });

        this.searchInputControl.valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
                switchMap((query) => {
                    this.matDrawer.close();
                    this._router.navigate(['./'], {relativeTo: this._activatedRoute});
                    this.isLoading = true;
                    return this._userService.getUsers()
                }),
                map(() => {
                    this.isLoading = false;
                })
            )
            .subscribe(() => {
                this._changeDetectorRef.markForCheck();
            });

        this.matDrawer.openedChange.subscribe((opened) => {
            if( !opened )
            {
                this.selectedUser = null;
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
        .subscribe(() => {
          this.createUser();
        });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    onBackdropClicked(): void
    {
        this._router.navigate(['./'], {relativeTo: this._activatedRoute});
        this._changeDetectorRef.markForCheck();
    }

    createUser(): void
    {
        this._router.navigate(['./000000000000'], {relativeTo: this._activatedRoute});
        this._changeDetectorRef.markForCheck();
    }

    trackByFn(index: number, item: any): any
    {
        return item.Key || index;
    }
}
