import { Injectable } from '@angular/core';
import {HttpClient,HttpParams, HttpErrorResponse} from '@angular/common/http'
import {catchError, map} from 'rxjs/operators';
import {BehaviorSubject, forkJoin, of, throwError, Observable} from 'rxjs';
import {Router} from '@angular/router';
import { environment, } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeService {
  // private LoginUrl = `${environment.apiUri}/api/tataoksourcing/user/login/`;
  //private LoginUrl = `${environment.apiUri}/api/login/`;
  private LoginUrl = `${environment.EdukanVss}/api/v1/ecom/admin/login/`;

  constructor(private http: HttpClient, private _Router: Router) { }


  loginAuth(data: any): Observable<any> {
     //return this.http.post<any>(this.LoginUrl, data).pipe();
     return this.http.post<any>(this.LoginUrl,data).pipe();
  }
  // loggedIn() {
  //   if (localStorage.getItem('token') && localStorage.getItem('token') !="null") {
  //       return true;
  //   } else {
  //     return false;
  //   }
  // }
  ExpireDateTime: any;
  loggedIn() {
    this.ExpireDateTime = JSON.parse(localStorage.getItem('timer'));
    let date1 = new Date();
    let date2 = new Date(this.ExpireDateTime);
    if (date2 >= date1) {
      if (localStorage.getItem('token') && localStorage.getItem('token') != "null") {
        return true;
      }
      else {
        return false;
      }
    }
    else {
     // localStorage.clear();
   localStorage.removeItem('token');
    //localStorage.removeItem('loginData');
      return false;
    }
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }
  loggedOut() {
   // alert('LogOut');
   debugger
    localStorage.removeItem('token');

    localStorage.removeItem('token');
  
    localStorage.removeItem('loginData');
   
   
   // localStorage.setItem('PageDetails', JSON.stringify(data.data.page_list));


    localStorage.clear();
    sessionStorage.clear();
   this._Router.navigate(['sessions/signin4']);
   
  }
  handlError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
