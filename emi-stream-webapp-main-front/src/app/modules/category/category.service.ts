import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, filter, map, of, switchMap, take, tap, throwError } from 'rxjs';
import { Category } from './category.type';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    private _category: BehaviorSubject<Category> = new BehaviorSubject<Category>({ title: '', description: '', status: 'active', icon: '' });
    private _categories: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);

    private _new: string = '000000000000';

    constructor(private _httpClient: HttpClient) { }

    get categories$(): Observable<Category[]> {
        return this._categories.asObservable();
    }

    get category$(): Observable<Category> {
        return this._category.asObservable();
    }

    getCategories(): Observable<Category[]> {
        return this._httpClient.get<Category[]>(`${environment.APIurl}/categories`)
            .pipe(
                tap((categories) => {
                    console.log(categories);
                    this._categories.next(categories);
                })
            );
    }

    getCategoryByKey(id: string): Observable<Category> {
        if (id === this._new) {
            return this._category.pipe(
                take(1),
                map(() => {
                    const category: Category = {
                        id: '',
                        title: '',
                        description: '',
                        status: 'active',
                        icon: ''
                    };
                    this._category.next(category);
                    return category;
                })
            );
        }

        return this._categories.pipe(
            take(1),
            map((categories) => {
                const category = categories.find(category => category['id'] === id) || { title: '', description: '', status: 'active', icon: '' };
                this._category.next(category);
                return category;
            }),
            switchMap((category) => {
                if (!category) {
                    return throwError(`No se pudo encontrar la categoria con la clave ${id}!`);
                }
                return of(category);
            })
        );
    }

    createCategory(newCategory: Category): Observable<Category> {
        console.log(newCategory);
        return this.categories$.pipe(
            take(1),
            switchMap(categories => this._httpClient.post<Category>(`${environment.APIurl}/categories`, newCategory).pipe(
                map((newCategory) => {
                    this._categories.next([newCategory, ...categories]);
                    return newCategory;
                })
            ))
        )
    }

    updateCategory(key: string, _update: Category): Observable<Category | null> {
        return this.categories$.pipe(
            take(1),
            switchMap(categories => {
                return this._httpClient.put<Category>(`${environment.APIurl}/categories/${key}`, _update)
                    .pipe(
                        map((updatedCategory: Category) => {
                            const index = categories.findIndex(item => item['id'] === key);
                            if (index !== -1) {
                                categories[index] = updatedCategory;
                                this._categories.next([...categories]); // Emit a new array to trigger change detection
                            }
                            return updatedCategory;
                        }),
                        switchMap((updatedCategory: Category) => {
                            return this.category$.pipe(
                                take(1),
                                filter(item => !!item && item['id'] === key), // Ensure item is not null before comparison
                                tap(() => {
                                    this._category.next(updatedCategory);
                                })
                            );
                        })
                    );
            })
        );
    }

    deleteCategory(key: string): Observable<boolean> {
        return this._categories.pipe(
            take(1),
            switchMap(categories => {
                return this._httpClient.delete<boolean>(`${environment.APIurl}/categories/${key}`)
                    .pipe(
                        map((isDeleted: boolean) => {
                            if (isDeleted) {
                                const updatedCategories = categories.filter(item => item['id'] !== key);
                                this._categories.next(updatedCategories);
                            }
                            return isDeleted;
                        })
                    );
            })
        );
    }
}
