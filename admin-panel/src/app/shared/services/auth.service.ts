import { Injectable } from '@angular/core';
// import { JwtHelperService } from '@auth0/angular-jwt';
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
  // isAuthenticated(): boolean {
  //   try {
  //     const helper = new JwtHelperService();
  //     return (!helper.isTokenExpired(localStorage.getItem('token')));
  //   } catch (error) {
  //     return false;
  //   }
  // }

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

  update(editData, action, id) {
    return this.http.patch(`${apiUrl}c/${action}/${id}`, editData).pipe(
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

  delete(action, id) {
    return this.http.delete(`${apiUrl}c/${action}/${id}`).pipe(
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

  register(loginData) {
    return this.http.post(`${apiUrl}register`, loginData).pipe(
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

  landing_page(loginData) {
    return this.http.post(`${apiUrl}landing_page`, loginData).pipe(
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

  listByModelName(model) {
    return this.http.get(`${apiUrl}c/${model}`).pipe(
      map(res => {
        return res;
      }),
      catchError((err) => {
        throw new Error(err.message);
      })
    );
  }

  countByModelName(model) {
    return this.http.get(`${apiUrl}c/${model}/count`).pipe(
      map(res => {
        return res;
      }),
      catchError((err) => {
        throw new Error(err.message);
      })
    );
  }

  createCallSet(callSetObject, model){
    return this.http.post(`${apiUrl}${model}`, callSetObject).pipe(
      map(res => {
        return res;
      }),
      catchError((err) => {
        throw new Error(err.message);
      })
    );
  }

  updateCallSet(callSetObject, api_route){
    return this.http.post(`${apiUrl}${api_route}`, callSetObject).pipe(
      map(res => {
        return res;
      }),
      catchError((err) => {
        throw new Error(err.message);
      })
    );
  }

  changeDuration(change_duration_url, duration){
    return this.http.get(`${apiUrl}${change_duration_url}/${duration}`).pipe(
      map(res => {
        return res;
      }),
      catchError((err) => {
        throw new Error(err.message);
      })
    );
  }

  getDuration(){
    return this.http.get(`${apiUrl}get_call_duration`).pipe(
      map(res => {
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