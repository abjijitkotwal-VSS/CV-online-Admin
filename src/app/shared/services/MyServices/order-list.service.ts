




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
export class OrderListService {

  
  private FailOrderListURL = `${environment.EdukanVss}/api/v1/ecom/admin/OrderHistoryAdminView/`;
  private OrderListURL = `${environment.EdukanVss}/api/v1/ecom/admin/OtcList/ `;
 // private InvoiceListURL = `${environment.EdukanVss}/api/v1/ecom/admin/OtcBasedinvoice/`;
  private InvoiceListURL = `${environment.EdukanVss}/api/v1/ecom/admin/InvoiceDetailWithPdf/ `;
  private OrderTrakingistURL = `${environment.EdukanVss}/api/v1/ecom/admin/InvoiceTrackingList/ `;
  private AllOrderTrakingistURL = `${environment.EdukanVss}/api/v1/ecom/admin/list/InvoiceAll/  `;
  
  private updateStatusURL = `${environment.EdukanVss}/api/v1/ecom/admin/TrackingStatusChange/ `;
  private InvoiceTATAPI = `${environment.EdukanVss}/api/v1/ecom/admin/list/GetTatListBasedInvoice/   `;
  // constructor(private http: HttpClient) { }
  constructor(private http: HttpClient,private auth: AuthorizeService) { }
  private getToken=this.auth.getToken();
  getInvoiceList() {
    
    return this.http.get('/api/invoices/');
  }

  getInvoiceById(id) {

  
    return this.http.get('/api/invoices/'+id);
    
  }
  
  saveInvoice(invoice) {
    if(invoice.id){
      return this.http.put('/api/invoices/'+invoice.id, invoice);
    } else {
      invoice.id = (Math.random() * 1000000000).toString();
      return this.http.post('/api/invoices/', invoice);
    }
  }

  deleteInvoice(id) {
    return this.http.delete('/api/invoices/'+id);
  }

  OrderList(Data: any):Observable<any>
  {
    return this.http.post(this.OrderListURL,Data, {headers:{"Content-Type":"application/json"}}).pipe(catchError(err => of(err)));
  }


  FailedOrderList(Data: any):Observable<any>
  {
    return this.http.post(this.FailOrderListURL,Data, {headers:{"Content-Type":"application/json"}}).pipe(catchError(err => of(err)));
  }



  InvoiceList(Data: any):Observable<any>
  {
    return this.http.post(this.InvoiceListURL,Data, {headers:{"Content-Type":"application/json"}}).pipe(catchError(err => of(err)));
  }


 OrderTrackingList(Data: any):Observable<any>
  {
    return this.http.post(this.OrderTrakingistURL,Data, {headers:{"Content-Type":"application/json"}}).pipe(catchError(err => of(err)));
  }

  OrderTrackingALlList(Data: any):Observable<any>
  {
    return this.http.post(this.AllOrderTrakingistURL,Data, {headers:{"Content-Type":"application/json"}}).pipe(catchError(err => of(err)));
  }


  updateStatus(Data: any):Observable<any>
  {
    return this.http.post(this.updateStatusURL,Data, {headers:{"Content-Type":"application/json"}}).pipe(catchError(err => of(err)));
  }


  InvoiceTAT(Data: any):Observable<any>
  {
    return this.http.post(this.InvoiceTATAPI,Data, {headers:{"Content-Type":"application/json"}}).pipe(catchError(err => of(err)));
  }



}
