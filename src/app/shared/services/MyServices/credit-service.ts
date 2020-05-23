import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
  })
export class CreditService {
    private RetailerListUrl = `${environment.EdukanVss}/api/v1/ecom/admin/retailer/list/  `;
    private FleetOwnerListUrl = `${environment.EdukanVss}/api/v1/ecom/admin/CreditListWithMappingList/    `;
    private ListUrl = `${environment.EdukanVss}/api/v1/ecom/admin/list/credit_list/   `;

    private TrasctionlistUrl  = `${environment.EdukanVss}/api/v1/ecom/admin/CreditMasterList/   `;
    private TrasctionDetailslistUrl  = `${environment.EdukanVss}/api/v1/ecom/admin/CreditDetailList/   `;
    constructor(private http:HttpClient,private _Router:Router) {   }


    
  RetailerList(data:any):Observable<any>
  {
     return this.http.post<any>(this.RetailerListUrl,data).pipe(catchError(this.handlError));
  } 

  FleetOwnerList(data:any):Observable<any>
  {
     return this.http.post<any>(this.FleetOwnerListUrl,data).pipe(catchError(this.handlError));
  } 

  TrsactionList(data:any):Observable<any>
  {
     return this.http.post<any>(this.TrasctionlistUrl,data).pipe(catchError(this.handlError));
  } 


  List(data:any):Observable<any>
  {
     return this.http.post<any>(this.ListUrl,data).pipe(catchError(this.handlError));
  } 



  TrsactionDetailList(data:any):Observable<any>
  {
     return this.http.post<any>(this.TrasctionDetailslistUrl,data).pipe(catchError(this.handlError));
  } 



  handlError(error:HttpErrorResponse)
  {
    return throwError(error)
  }
}
