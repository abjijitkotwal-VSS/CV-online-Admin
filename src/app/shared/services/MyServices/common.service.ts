import { Injectable } from '@angular/core';
import {HttpClient,HttpParams, HttpErrorResponse} from '@angular/common/http'
import {catchError, map} from 'rxjs/operators';
import {BehaviorSubject, forkJoin, of, throwError, Observable} from 'rxjs';
import {Router} from '@angular/router';
import { environment, } from '../../../../environments/environment';
import {AuthorizeService} from '../MyServices/authorize.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  // private StateURL = `${environment.apiUri}/api/states/`;
  // private DistrictsURL = `${environment.apiUri}/api/districts/ `;
  // private CitiesURL = `${environment.apiUri}/api/cities/`;
  // private TalukasURL = `${environment.apiUri}/api/talukas/`;
  // private PincodesURL = `${environment.apiUri}/api/pincodes/`;

  // private CategoryUrl = `${environment.TataapiUri}/api/v1/auction/category/`;
  // private SubCategoryUrl = `${environment.TataapiUri}/api/v1/auction/subcategory/`;
  // private ControlBindUrl = `${environment.TataapiUri}/api/v1/auction/getControls/`;
  
  // private InventoryDrpDown = `${environment.TataapiUri}/api/v1/auction/drpinventory/`;

  private RoletypeDrpDwn = `${environment.EdukanVss}/api/v1/ecom/admin/role_List/`;
  private PositionDrpDwn = `${environment.EdukanVss}/api/v1/ecom/admin/position_list/`;
 
  private SaveRegistration = `${environment.EdukanVss}/api/v1/ecom/admin/registration/`;
  private UpdateRegistrationUrl = `${environment.EdukanVss}/api/v1/ecom/admin/update_account/`;
  private RegistrationListAPi = `${environment.EdukanVss}/api/v1/ecom/admin/registered_list/`;
  private DashboardAPi = `${environment.EdukanVss}/api/v1/ecom/admin/list/dashboard/ `;
  private DistributorListAPi = `${environment.EdukanVss}/api/v1/ecom/get/list/distributor/ `;
  private DiVisionURL = `${environment.EdukanVss}/api/v1/ecom/get/list/division/   `;
  
//oldDashboard
  //private DashboardAPi = `${environment.EdukanVss}/api/v1/ecom/admin/DashboardStatistics/ `;
  private InventoryStatus = new BehaviorSubject<string>('');
  cast = this.InventoryStatus.asObservable();
  constructor(private http: HttpClient,private auth: AuthorizeService) { }
  getAuditButtonStatus(data) {
    this.InventoryStatus.next(data);
  }
  private getToken=this.auth.getToken();
  // BindCategory():Observable<any>
  // {
  //    return this.http.post<any>(this.CategoryUrl,'').pipe(catchError(this.handlError));
  // }
  
  // BindSubCategory(data: any):Observable<any>
  // {
  //    return this.http.post<any>(this.SubCategoryUrl,data).pipe(catchError(this.handlError));
  // }
  
  // BindControls(Data: any):Observable<any>
  // {
  //    return this.http.post<any>(this.ControlBindUrl,Data).pipe(catchError(this.handlError));
  // }
 
  getDealerCode(): string {
    if (localStorage.getItem('loginData') && localStorage.getItem('loginData') != "null") {
      var i = JSON.parse(localStorage.getItem('loginData'))
      return i[0].dealer_code;
    }
    else {
      return null;
    }
  }

  GetDistributorCode(): string {
    debugger;
    if (localStorage.getItem('loginData') && localStorage.getItem('loginData') != "null") {
      var i = JSON.parse(localStorage.getItem('loginData'))
      return i.distributor_code;
    }
    else {
      return null;
    }
  }


  getRole(): string {
    debugger;
    if (localStorage.getItem('loginData') && localStorage.getItem('loginData') != "null") {
      var i = JSON.parse(localStorage.getItem('loginData'))
      return i.role_name;
    }
    else {
      return null;
    }
  }

  getFullName(): string {
    if (localStorage.getItem('loginData') && localStorage.getItem('loginData') != "null") {
      var i = JSON.parse(localStorage.getItem('loginData'))
      return i[0].dsm_name;
    }
    else {
      return null;
    }
  }


  getUserCode(): string {
    if (localStorage.getItem('loginData') && localStorage.getItem('loginData') != "null") {
      var i = JSON.parse(localStorage.getItem('loginData'))
      return i.username;
    }
    else {
      return null;
    }
  }


  
  // BindInventoryDrpdown(Data: any):Observable<any>
  // {
  //    return this.http.post<any>(this.InventoryDrpDown,Data).pipe(catchError(this.handlError));
  // }


  BindRoleType(Data: any):Observable<any>
  {
    return this.http.post(this.RoletypeDrpDwn,'', {headers:{"Content-Type":"application/json"}}).pipe(catchError(err => of(err)));
  }

  BindPosition(Data: any):Observable<any>
  {
    return this.http.post(this.PositionDrpDwn,Data, {headers:{"Content-Type":"application/json"}}).pipe(catchError(err => of(err)));
  }


  
  RegistrationSave(Data: any):Observable<any>
  {
    return this.http.post(this.SaveRegistration,Data, {headers:{"Content-Type":"application/json"}}).pipe(catchError(err => of(err)));
  }

  RegistrationUpdate(Data: any):Observable<any>
  {
    return this.http.post(this.UpdateRegistrationUrl,Data, {headers:{"Content-Type":"application/json"}}).pipe(catchError(err => of(err)));
  }


  RegistrationList(Data: any):Observable<any>
  {
    return this.http.post(this.RegistrationListAPi,Data, {headers:{"Content-Type":"application/json"}}).pipe(catchError(err => of(err)));
  }



  Dashboard(Data: any):Observable<any>
  {
    return this.http.post(this.DashboardAPi,Data, {headers:{"Content-Type":"application/json"}}).pipe(catchError(err => of(err)));
  }


  DistributorList(Data: any):Observable<any>
  {
    return this.http.post(this.DistributorListAPi,Data, {headers:{"Content-Type":"application/json"}}).pipe(catchError(err => of(err)));
  }


  DivisionList(Data: any):Observable<any>
  {
    return this.http.post(this.DiVisionURL,Data, {headers:{"Content-Type":"application/json"}}).pipe(catchError(err => of(err)));
  }




  // BindState(Data: any):Observable<any>
  // {
  //    return this.http.post<any>(this.StateURL,'').pipe(catchError(this.handlError));
  // }

  // BindState() {
  //   return this.http.post(this.StateURL, {
  //     headers:{"Content-Type": "application/json"},
  //    observe: 'response'
  //  }).pipe(catchError(err => of(err)));
//}

// BindDistrict(data:any):Observable<any>{
//   return this.http.post(this.DistrictsURL,data, {headers:{"Content-Type":"application/json"}}).pipe(catchError(err => of(err)));
// }


// BindCity(data:any):Observable<any>{
//   return this.http.post(this.CitiesURL,data,{headers:{"Content-Type": "application/json"}}).pipe(catchError(err => of(err)));
// }

// BindTaluka(data:any):Observable<any>{
//   return this.http.post(this.TalukasURL,data, {headers:{"Content-Type":"application/json"}}).pipe(catchError(err => of(err)));
// }

// BindPincode(data:any):Observable<any>{
//   return this.http.post(this.PincodesURL,data, {headers:{"Content-Type":"application/json"}}).pipe(catchError(err => of(err)));
// }


  handlError(error:HttpErrorResponse)
  {
    return throwError(error)
  }
}
