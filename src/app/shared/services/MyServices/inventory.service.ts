import { Injectable } from '@angular/core';
import {HttpClient,HttpParams, HttpErrorResponse} from '@angular/common/http'
import {catchError, map} from 'rxjs/operators';
import {BehaviorSubject, forkJoin, of, throwError, Observable} from 'rxjs';
import {Router} from '@angular/router';
import { environment, } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  // private AddInventoryUrl = `${environment.TataapiUri}/api/v1/auction/addInventory/`;
  // private InventoryListUrl = `${environment.TataapiUri}/api/v1/auction/inventoryList/`;
 


  constructor(private http:HttpClient,private _Router:Router) { }

  

  // AddInventory(data:any):Observable<any>
  // {
  //    return this.http.post<any>(this.AddInventoryUrl,data).pipe(catchError(this.handlError));
  // }
  // InventoryList(data:any):Observable<any>
  // {
  //    return this.http.post<any>(this.InventoryListUrl,data).pipe(catchError(this.handlError));
  // }




  
  handlError(error:HttpErrorResponse)
  {
    return throwError(error)
  }
}
