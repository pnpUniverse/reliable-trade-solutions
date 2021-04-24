import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

const { apiUrl } = environment;
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  isAuthenticated(): boolean {
    try {
      const helper = new JwtHelperService();
      return (!helper.isTokenExpired(localStorage.getItem('token')));
    } catch (error) {
      return false;
    }
  }

  login(loginData) {
    return this.http.post(`${apiUrl}login`, loginData).pipe(
      map(res => {
        if (res['token']) {
          localStorage.setItem('token', res['token']);
        }
        return res;
      }),
      catchError((err) => {
        throw new Error(err.message);
      })
    );
  }

  create(createData, action) {
    return this.http.post(`${apiUrl}c/${action}/create`, createData).pipe(
      map(res => {
        if (res['token']) {
          localStorage.setItem('token', res['token']);
        }
        return res;
      }),
      catchError((err) => {
        throw new Error(err.message);
      })
    );
  }

  retrieve(action) {
    return this.http.get(`${apiUrl}c/${action}`).pipe(
      map(res => {
        if (res['token']) {
          localStorage.setItem('token', res['token']);
        }
        return res;
      }),
      catchError((err) => {
        throw new Error(err.message);
      })
    );
  }

  retrieveById(action, id) {
    return this.http.get(`${apiUrl}c/${action}/${id}`).pipe(
      map(res => {
        if (res['token']) {
          localStorage.setItem('token', res['token']);
        }
        return res;
      }),
      catchError((err) => {
        throw new Error(err.message);
      })
    );
  }

  retrieveBySlug(collection, slug) {
    return this.http.get(`${apiUrl}c/${collection}/slug/${slug}`).pipe(
      map(res => {
        if (res['token']) {
          localStorage.setItem('token', res['token']);
        }
        return res;
      }),
      catchError((err) => {
        throw new Error(err.message);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }
}