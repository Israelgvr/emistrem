import { Route } from '@angular/router';
import { UsersResolver, UsersUserResolver } from './users.resolvers';
import { UsersListComponent } from './list/list.component';
import { UsersComponent } from './users.component';
import { UsersDetailsComponent } from './details/details.component';
import { CanDeactivateUsersDetails } from './users.guards';

export const usersRoutes: Route[] = [
    {
        path     : '',
        component: UsersComponent,
        children : [
            {
                path     : '',
                component : UsersListComponent,
                resolve   : {
                    users : UsersResolver
                },
                children : [
                    {
                        path          : ':key',
                        component     : UsersDetailsComponent,
                        resolve       : {
                            usersDetails: UsersUserResolver
                        },
                        canDeactivate : [CanDeactivateUsersDetails]
                    }
                ]
            }
        ]
    }
]
