import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataPassService {

  private data = {};  
  private OrderData = {}; 
  private FailOrderData ={};
  private OrderAdvancedFilterData = {}; 
  setOption(value) {      
    this.data = value;  
  }  
  
  getOption() {  
    return this.data;  
  } 
  private approvalStageMessage = new BehaviorSubject('');
 currentApprovalStageMessage = this.approvalStageMessage.asObservable();
 cast = this.approvalStageMessage.asObservable();

  constructor() { }
  updateApprovalMessage(message: string) {
    this.approvalStageMessage.next(message)
    }


    getAuditButtonStatus(data) {
      this.approvalStageMessage.next(data);
    }


    setOrderListData(value) {

      this.OrderData = value; 

    }

    getOrderListData() {  
      return this.OrderData;  
    } 
//

    setFailedOrderListData(value) {

      this.FailOrderData = value; 

    }

    getFailOrderListData() {  
      return this.FailOrderData;  
    } 

    //



    setOrderFilterData(value) {

      this.OrderAdvancedFilterData = value; 

    }

    getOrderFiltertData() {  
      return this.OrderAdvancedFilterData;  
    } 


    

}