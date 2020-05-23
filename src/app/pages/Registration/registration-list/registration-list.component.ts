import { Component, OnInit, OnDestroy } from '@angular/core';
import { CrudService } from '../../crud.service';
import { MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { AppConfirmService } from '../../../shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from '../../../shared/services/app-loader/app-loader.service';
//import { NgxTablePopupComponent } from './ngx-table-popup/ngx-table-popup.component';
import { Subscription } from 'rxjs';
import { egretAnimations } from "../../../shared/animations/egret-animations";

import { CommonService } from '../../../shared/services/MyServices/common.service';

import { ListInput } from '../../../shared/models/list-input';


import { DataPassService } from '../../../shared/services/MyServices/data-pass.service'
import { Router } from '@angular/router';
import { ViewEncapsulation } from '@angular/core';
//import { Page } from 'app/shared/components/sidenav/sidenav.component';
import { Page } from '../../../../../src/app/shared/models/PaginationPage'
@Component({
  selector: 'app-registration-list',
  templateUrl: './registration-list.component.html',
  styleUrls: ['./registration-list.component.scss'],
  animations: egretAnimations,
  encapsulation: ViewEncapsulation.None,
})
export class RegistrationListComponent implements OnInit {

  page = new Page();
  FilterString :any;
  account_type: string;
  status: string;
  user_name: string;
  contact_no: string;
  email_id: string;
  first_name: string;
  last_name: string;
  distributor_code: string;
  position: string;
  position_id: string;
role_id: string;
temp = [];

  public items: any[];
  public getItemSub: Subscription;
  message: string;
  constructor(
    private CommonService: CommonService,
    private data: DataPassService,
    private router: Router,
    private loader: AppLoaderService,
    // private dialog: MatDialog,
    // private snack: MatSnackBar,
    // private crudService: CrudService,
    // private confirmService: AppConfirmService,
    // private loader: AppLoaderService
  ) {
    this.page.pageNumber = 0;
    this.page.size = 10;
    this.page.totalElements = 0;
  }
  appParentMessage: string;
  receiveMessage($event) {
  // console.log($event);
  
    const ListInput: ListInput = {} as ListInput;

   this.account_type=$event.account_type;
   this.status=$event.status;
   this.user_name=$event.user_name;
   this.contact_no=$event.contact_no;
   this.email_id=$event.email_id;
   this.first_name=$event.first_name;
   this.last_name=$event.last_name;
   this.distributor_code=$event.distributor_code;
   this.position=$event.position;
   this.position_id=$event.position_id;
   this.role_id=$event.role_id;

   if (this.position_id) {

    ListInput.position_id = this.position_id;
  }
  else {

    ListInput.position_id = "";
  }


   if (this.role_id) {

    ListInput.role_id = this.role_id;
  }
  else {

    ListInput.role_id = "";
  }

   if (this.position) {

    ListInput.position = this.position;
  }
  else {

    ListInput.position = "";
  }


   if (this.distributor_code) {

    ListInput.distributor_code = this.distributor_code;
  }
  else {

    ListInput.distributor_code = "";
  }


   if (this.last_name) {

    ListInput.last_name = this.last_name;
  }
  else {

    ListInput.last_name = "";
  }


   if (this.first_name) {

    ListInput.first_name = this.first_name;
  }
  else {

    ListInput.first_name = "";
  }


   if (this.email_id) {

    ListInput.email_id = this.email_id;
  }
  else {

    ListInput.email_id = "";
  }



   if (this.contact_no) {

    ListInput.contact_no = this.contact_no;
  }
  else {

    ListInput.contact_no = "";
  }



   if (this.user_name) {

    ListInput.user_name = this.user_name;
  }
  else {

    ListInput.user_name = "";
  }



   if (this.account_type) {

    ListInput.account_type = this.account_type;
  }
  else {

    ListInput.account_type = "";
  }

  if (this.status) {

    ListInput.status = this.status;
  }
  else {

    ListInput.status = "";
  }

  ListInput.offset = 0;
  this.GetList(ListInput);


  }

  ngOnInit() {
    const ListInput: ListInput = {} as ListInput;

    ListInput.offset = 0;
    this.GetList(ListInput);
    //this.data.currentMessage.subscribe(message => this.message = message)
    //this.getItems()
  }

  setPage(pageInfo) {
    this.page.pageNumber = pageInfo.offset;
    //  alert(pageInfo.offset);
    const ListInput: ListInput = {} as ListInput;

    ListInput.offset = pageInfo.offset;



    if (this.position_id) {

      ListInput.position_id = this.position_id;
    }
    else {
  
      ListInput.position_id = "";
    }
  
  
     if (this.role_id) {
  
      ListInput.role_id = this.role_id;
    }
    else {
  
      ListInput.role_id = "";
    }

    if (this.position) {

      ListInput.position = this.position;
    }
    else {
  
      ListInput.position = "";
    }
  
  
     if (this.distributor_code) {
  
      ListInput.distributor_code = this.distributor_code;
    }
    else {
  
      ListInput.distributor_code = "";
    }
  
  
     if (this.last_name) {
  
      ListInput.last_name = this.last_name;
    }
    else {
  
      ListInput.last_name = "";
    }
  
  
     if (this.first_name) {
  
      ListInput.first_name = this.first_name;
    }
    else {
  
      ListInput.first_name = "";
    }
  
  
     if (this.email_id) {
  
      ListInput.email_id = this.email_id;
    }
    else {
  
      ListInput.email_id = "";
    }
  
  
  
     if (this.contact_no) {
  
      ListInput.contact_no = this.contact_no;
    }
    else {
  
      ListInput.contact_no = "";
    }
  
  
  
     if (this.user_name) {
  
      ListInput.user_name = this.user_name;
    }
    else {
  
      ListInput.user_name = "";
    }
  
  
  
     if (this.account_type) {
  
      ListInput.account_type = this.account_type;
    }
    else {
  
      ListInput.account_type = "";
    }
  
    if (this.status) {
  
      ListInput.status = this.status;
    }
    else {
  
      ListInput.status = "";
    }

    this.GetList(ListInput);

  }
  ngOnDestroy() {

    //this.GetList();
    if (this.items) {

    }
  }

  updateFilter(event) {
    
    const val = event.target.value.toLowerCase();
    var columns = Object.keys(this.temp[0]);
  //  console.log('this.temp');
   // console.log(this.temp);
    // Removes last "$$index" from "column"
    columns.splice(columns.length - 1);

    // console.log(columns);
    if (!columns.length)
      return;

    const rows = this.temp.filter(function (d) {
      for (let i = 0; i <= columns.length; i++) {
        let column = columns[i];
        // console.log(d[column]);
        if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
          return true;
        }
      }
    });

    this.items = rows;
  }
  getItems() {
    // this.getItemSub = this.crudService.getItems()
    //   .subscribe(data => {
    //     this.items = data;
    //   })
  }

  // openPopUp(data: any = {}, isNew?) {
  //   let title = isNew ? 'Add new member' : 'Update member';
  //   let dialogRef: MatDialogRef<any> = this.dialog.open(NgxTablePopupComponent, {
  //     width: '720px',
  //     disableClose: true,
  //     data: { title: title, payload: data }
  //   })
  //   dialogRef.afterClosed()
  //     .subscribe(res => {
  //       if(!res) {
  //         // If user press cancel
  //         return;
  //       }
  //       this.loader.open();
  //       if (isNew) {
  //         this.crudService.addItem(res)
  //           .subscribe(data => {
  //             this.items = data;
  //             this.loader.close();
  //             this.snack.open('Member Added!', 'OK', { duration: 4000 })
  //           })
  //       } else {
  //         this.crudService.updateItem(data._id, res)
  //           .subscribe(data => {
  //             this.items = data;
  //             this.loader.close();
  //             this.snack.open('Member Updated!', 'OK', { duration: 4000 })
  //           })
  //       }
  //     })
  // }
  // deleteItem(row) {
  //   this.confirmService.confirm({message: `Delete ${row.name}?`})
  //     .subscribe(res => {
  //       if (res) {
  //         this.loader.open();
  //         this.crudService.removeItem(row)
  //           .subscribe(data => {
  //             this.items = data;
  //             this.loader.close();
  //             this.snack.open('Member deleted!', 'OK', { duration: 4000 })
  //           })
  //       }
  //     })
  // }
  Edit(data: any = {}) {

    //console.log(data);

    //alert('Edit');
    if (data != '') {
      this.data.setOption(data);
    }
    else {

    }

    this.router.navigate(['pages/UserRegistration']);


  }
  FilterStrings(ListInput) {
    debugger
    this.FilterString = "";

   

    if (ListInput.position_id == "" || ListInput.position_id == undefined || ListInput.position_id == null) {

     
    }
    else {
  
      this.FilterString = this.FilterString +  ' <b>Position: </b>'  + ListInput.position_id;
    }
  
  
     if (ListInput.role_id == "" || ListInput.role_id == undefined || ListInput.role_id == null) {
  
      
    }
    else {
  
      this.FilterString =  this.FilterString + '<b>Role: </b>'  + ListInput.role_id;
    }
  
     if (ListInput.position == "" || ListInput.position == undefined || ListInput.position == null) {
  
     
    }
    else {
  
      this.FilterString = this.FilterString + ' <b>Position: </b>'  + ListInput.position;
    }
  
  
     if (ListInput.distributor_code == "" || ListInput.distributor_code == undefined || ListInput.distributor_code == null) {
  
     
    }
    else {
  
      this.FilterString = this.FilterString + ' <b>Distributor Code: </b>'  + ListInput.distributor_code;
    }
  
  
     if (ListInput.last_name == "" || ListInput.last_name == undefined || ListInput.last_name == null) {
  
      
    }
    else {
  
      this.FilterString = this.FilterString + '<b>last Name : </b>'  + ListInput.last_name;
    }
  
  
     if (ListInput.first_name == "" || ListInput.first_name == undefined || ListInput.first_name == null) {
  
     
    }
    else {
  
      this.FilterString = this.FilterString + ' <b>First Name: </b>'  + ListInput.first_name;
    }
  
  
     if (ListInput.email_id == "" || ListInput.email_id == undefined || ListInput.email_id == null) {
  
    
    }
    else {
  
      this.FilterString =  this.FilterString  + '<b>Email-Id: </b>'  + ListInput.email_id;
    }
  
  
  
     if (ListInput.contact_no == "" || ListInput.contact_no == undefined || ListInput.contact_no == null) {
  
      
    }
    else {
  
      this.FilterString =  this.FilterString + '<b>Contact Number: </b>'  + ListInput.contact_no;
    }
  
  
  
     if (ListInput.user_name == "" || ListInput.user_name == undefined || ListInput.user_name == null) {
  
  
    }
    else {
  
      this.FilterString =  this.FilterString + '<b>User name: </b>'  + ListInput.user_name;
    }
  
  
  
     if (ListInput.account_type == "" || ListInput.account_type == undefined || ListInput.account_type == null) {
  
      
    }
    else {
  
      this.FilterString = this.FilterString + '<b>Account Type </b>'  + ListInput.account_type;
    }
  
    if (ListInput.status == "" || ListInput.status == undefined || ListInput.status == null) {
  
   
    }
    else {
  
      this.FilterString = this.FilterString + '<b>Status: </b>'  + ListInput.status;
    }
  }

  GetList(ListInput) {
    this.FilterStrings(ListInput);
    // debugger
    // console.log(offset.offset);
  //  console.log('ListInput');
//console.log(ListInput);
    // const ListInput: ListInput = {} as ListInput;
    this.loader.open();
    // ListInput.offset = offset.offset;

    debugger
    this.CommonService.RegistrationList(ListInput).subscribe(

      data => {
        debugger
        //console.log(data.rangeInfo.total_row);
        this.page.totalElements = data.rangeInfo.total_row;
        if (data.success == true) {
         // console.log(data);

          this.items =this.temp = data.data;
        
          this.loader.close();
        }



        else {

          this.loader.close();

        }
      }, (err) => {
        this.loader.close();
      }

    );




  }



}
