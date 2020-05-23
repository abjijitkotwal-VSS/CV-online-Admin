import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataPassService } from '../../../shared/services/MyServices/data-pass.service'

import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

import { CommonService } from '../../../shared/services/MyServices/common.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-role-page-mapping',
  templateUrl: './role-page-mapping.component.html',
  styleUrls: ['./role-page-mapping.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RolePageMappingComponent implements OnInit {
  color;
  checked;
  CheckedLable: string;
  disabled;
  RoleTypeDisabled: boolean;
  isApprove: boolean;
  btnSave: boolean;
  btnUpdate: boolean;
  DstCOdeDisabled: boolean;
  rows = [];
  selected = [];
  isDisplayTable: boolean;
  public itemForm: FormGroup;
  constructor(
    private data: DataPassService,
    private CommonService: CommonService,
    private snack: MatSnackBar,
    private router: Router,

    private fb: FormBuilder,
  ) { }
  public datas: any;
  RoleType: any[];
  Position: any[];

  click: Subscription;
  ngOnInit() {
    this.selected=[];
    this.isDisplayTable = false
    debugger;
    this.rows = json;



    for (let entry1 of this.rows) {
      
      if (entry1.Status == true) {
        this.selected.push(entry1);
      }
    }

    console.log(this.selected);

    debugger;
    // this.datas = this.data.getOption();

    console.log(this.rows);

    this.buildItemForm()







    this.GetRole();


  }

  GetRole() {

    this.CommonService.BindRoleType('').subscribe(

      data => {

        if (data.success == true) {

          this.RoleType = data.data;


        }


        else {

        }
      }, (err) => {

      }

    );




  }


  GetPosition(id) {

    debugger;

    var Json = {
      "role_id": id
    }


    this.CommonService.BindPosition(Json).subscribe(

      data => {

        if (data.success == true) {

          this.Position = data.data;

        }


        else {

        }
      }, (err) => {

      }

    );




  }


  buildItemForm() {

    // //console.log('Hi5556');
    // //console.log(item);

    // var X = "true";

    // this.checked = false;
    // this.CheckedLable = "Inactive";
    // debugger


    debugger;
    this.itemForm = this.fb.group({

      role_id: [''],
      position_id: [''],



    })
  }

  OnselectedPosition() {
    console.log(this.itemForm.value);

    this.isDisplayTable = true
  }



  OnselectedRole(value) {
    debugger

    this.GetPosition(value);




  }
  submit() {

  }

  oncalcel() {
    ///this.router.navigate(['pages/RegistrationList']);
  }

  save() {

    console.log(this.selected)



  }

  onInvoicedSelect(row) {
    console.log(row)


    //  this.selected.push(row);


    // console.log(this.selected)
  }



  update() {




  }

  CheckStatus(row) {
    console.log(row);
    return row;
  }


}


export class Updateinfo {
  action_type: string;
  account_pk: number;
  role_id: number;
  first_name: string;
  phone_number: string;
  email_id: string;
  last_name: string;
  position_id: number;
  distributor_code: string;
  is_active: boolean;





}


var json = [

  {
    "Status": true,
    "PagemasterId": "1",
    "PageDetailId": "1",
    "PageDetailDisplyaName": "DashBoard",
    "PageMasterDisplyname": "DashBoard",

  },
  {
    "Status": false,
    "PagemasterId": "2",
    "PageDetailId": "2",
    "PageDetailDisplyaName": "OrderTracking",
    "PageMasterDisplyname": "OrderSummary",

  },

  {
    "Status": true,
    "PagemasterId": "2",
    "PageDetailId": "3",
    "PageDetailDisplyaName": "OrderHistory",
    "PageMasterDisplyname": "OrderSummary",

  }

  ,

  {
    "Status": true,
    "PagemasterId": "3",
    "PageDetailId": "4",
    "PageDetailDisplyaName": "RegitrationList",
    "PageMasterDisplyname": "Regitsation",

  }
  ,

  {
    "Status": true,
    "PagemasterId": "4",
    "PageDetailId": "5",
    "PageDetailDisplyaName": "Creditlimit",
    "PageMasterDisplyname": "UmsecuredCredit",

  }
]
