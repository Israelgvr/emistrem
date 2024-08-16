import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of, throwError } from "rxjs";
import { map, take, tap, switchMap, filter } from 'rxjs/operators';
import { User } from "./users.types";
import { Role } from "./roles.types";
import { environment } from "src/environments/environment";


@Injectable({
    providedIn: 'root'
})
export class
UsersService
{
    private _user: BehaviorSubject<User> = new BehaviorSubject<User>({ fullName : '', username : '', email : '', status : 'active', phone : '' });
    private _users: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
    private _roles: BehaviorSubject<Role[]> = new BehaviorSubject<Role[]>([]);

    roleToUser : any;

    private _new:string = '000000000000';

    constructor(private _httpClient: HttpClient){}

    get roles$(): Observable<Role[]>
    {
        return this._roles.asObservable();
    }

    get users$(): Observable<User[]>
    {
        return this._users.asObservable();
    }

    get user$(): Observable<User>
    {
        return this._user.asObservable();
    }

    getUsers(): Observable<User[]>
    {
        return this._httpClient.get<User[]>(`${environment.APIurl}/users`)
        .pipe(
            tap((users) => {
                this._users.next(users);
            })
        );
    }

    getRoles(): Observable<Role[]>
    {
        return this._httpClient.get<Role[]>(`${environment.APIurl}/roles`)
        .pipe(
            tap((roles) => {
                this._roles.next(roles);
            })
        );
    }

    getUserByKey(id: string): Observable<User>
    {
        if(id === this._new)
        {
            return this._user.pipe(
                take(1),
                map(() => {
                    const user : User = {
                        id : '',
                        fullName: '',
                        username: '',
                        email: '',
                        password: '',
                        phone: '',
                        status: 'active',
                        roles: []
                    };
                    this._user.next(user);
                    return user;
                })
            );
        }

        return this._users.pipe(
            take(1),
            map((Users) => {
                const user = Users.find(user => user['id'] ===  id) || { fullName : '', username : '', email : '', status : 'active', phone : '' };
                this._user.next(user);
                return user;
            }),
            switchMap((User) => {
                if ( !User )
                {
                    return throwError(`No se pudo encontrar el usuario con la clave ${id}!`);
                }
                return of(User);
            })
        );
    }

    createUser(newUser: User): Observable<User>
    {
        console.log(newUser);
        return this.users$.pipe(
            take(1),
            switchMap(users => this._httpClient.post<User>(`${environment.APIurl}/users`, newUser).pipe(
                map((newUser) => {
                    this._users.next([newUser, ...users]);
                    return newUser;
                })
            ))
        )
    }

    updateUser(key: string, _update: User): Observable<User | null> {
        return this.users$.pipe(
            take(1),
            switchMap(users => {
                return this._httpClient.put<User>(`${environment.APIurl}/users/${key}`, _update)
                    .pipe(
                        map((updatedUser: User) => {
                            const index = users.findIndex(item => item['id'] === key);
                            if (index !== -1) {
                                users[index] = updatedUser;
                                this._users.next([...users]); // Emit a new array to trigger change detection
                            }
                            return updatedUser;
                        }),
                        switchMap((updatedUser: User) => {
                            return this.user$.pipe(
                                take(1),
                                filter(item => !!item && item['id'] === key), // Ensure item is not null before comparison
                                tap(() => {
                                    this._user.next(updatedUser);
                                })
                            );
                        })
                    );
            })
        );
    }

    deleteUser(key: string): Observable<boolean> {
        return this.users$.pipe(
            take(1),
            switchMap(users => {
                return this._httpClient.delete<boolean>(`${environment.APIurl}/users/${key}`)
                    .pipe(
                        map((isDeleted: boolean) => {
                            if (isDeleted) {
                                const updatedUsers = users.filter(item => item['id'] !== key);
                                this._users.next(updatedUsers);
                            }
                            return isDeleted;
                        })
                    );
            })
        );
    }
}
