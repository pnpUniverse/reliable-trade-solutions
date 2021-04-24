import { tap } from 'rxjs/operators';
import { Injectable, Inject, forwardRef } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Observable, Subscription } from 'rxjs';

import { Router } from '@angular/router';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    public subs: Subscription;
    constructor(
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const headers = {
            setHeaders: {
                // 'Content-Type': 'application/json'
            }
        }
        const authRequest = request.clone(headers);

        return this.makeRequest({ next, authRequest });

        // if (this.roleService.isRoleActivated((request))) {
        //     return this.handleRoleAccessRequest({ next, request });
        // } else {
        //     const headers = {
        //         setHeaders: {
        //             Authorization: (
        //                 !this.localStorage.get('token') &&
        //                 this.localStorage.get('guestToken')
        //             ) ? `${this.localStorage.get('guestToken')}` : `${this.localStorage.get('token')}`,
        //             'X-Role-Access': btoa(this.cookie.get(ROLE_ACCESS.ROLE_ACCESS_HEADER_KEY))
        //         }
        //     };
        //     // if (!this.localStorage.get('token') && this.localStorage.get('guestToken')) {
        //     // 	headers = {
        //     // 		setHeaders: {
        //     // 			Authorization: `${this.localStorage.get('guestToken')}`,
        //     // 			'X-Role-Access': btoa(this.cookie.get(ROLE_ACCESS.ROLE_ACCESS_HEADER_KEY))
        //     // 		}
        //     // 	};
        //     // }
        //     const authRequest = request.clone(headers);
        //     return this.makeRequest({ next, authRequest });
        // }
    }

    // handleRoleAccessRequest({ next, request }): Observable<HttpEvent<any>> {
    //     this.roleService.triggerOperation({
    //         type: ROLE_ACCESS.ROLE_OPERATIONS.CHECK_REQUEST
    //     });
    //     return Observable.fromPromise(
    //         new Promise((resolve, reject) => {
    //             try {
    //                 this.roleService.roleOperation().subscribe(({ type, currentOperationToken }) => {
    //                     if (type === ROLE_ACCESS.ROLE_OPERATIONS.ALLOW_REQUEST) {
    //                         resolve(currentOperationToken);
    //                     }
    //                 });
    //             } catch (error) {
    //                 reject(error);
    //             }
    //         })
    //     ).mergeMap((currentRoleUserToken) => {
    //         const roleUserRequest = request.clone({
    //             setHeaders: {
    //                 Authorization: currentRoleUserToken,
    //                 'X-Role-Access': btoa(this.cookie.get(ROLE_ACCESS.ROLE_ACCESS_HEADER_KEY))
    //             }
    //         });
    //         return this.makeRequest({ next, authRequest: roleUserRequest });
    //     });
    // }

    makeRequest({ next, authRequest }): Observable<HttpEvent<any>> {
        return next.handle(authRequest).pipe(tap((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) { }
        }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
                switch (err.status) {
                    case 401:
                        break;
                    case 403:
                        break;
                }
            }
        }));
    }

}
