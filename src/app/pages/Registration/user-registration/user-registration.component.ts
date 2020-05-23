import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataPassService } from '../../../shared/services/MyServices/data-pass.service'

import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

import { CommonService } from '../../../shared/services/MyServices/common.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {
  color;
  checked;
  CheckedLable: string;
  disabled;
  RoleTypeDisabled : boolean;
  isApprove: boolean;
  btnSave: boolean;
  btnUpdate: boolean;
  DstCOdeDisabled: boolean;
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
    this.RoleTypeDisabled=false;
    this.isApprove = false;
    debugger;
    this.datas = this.data.getOption();
   

    if (this.datas.userid == '' || this.datas.userid == undefined || this.datas.userid == null) {
      
     
      this.btnSave = true;
      this.btnUpdate = false;
      this.buildItemForm('')
    }
    else {

     
      this.buildItemForm(this.datas)
      this.btnSave = false;
      this.btnUpdate = true;
      this.RoleTypeDisabled=true;

      this.GetPosition(this.datas.position_id)


      debugger;
      const DstCodeValidator = this.itemForm.get('distributor_code');
 
     // salaryControl.setValidators([Validators.required]);

      if (this.datas.role_id == 1) {
        this.DstCOdeDisabled = true;
      //  DstCodeValidator.setValidators(null);
      DstCodeValidator.setValidators(null);
        DstCodeValidator.updateValueAndValidity();
      }
      else {
        this.DstCOdeDisabled = false;
       

        DstCodeValidator.setValidators([Validators.required]);
        DstCodeValidator.updateValueAndValidity();
      }


    }




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


  buildItemForm(item) {

    //console.log('Hi5556');
    //console.log(item);

    var X = "true";

    this.checked = false;
    this.CheckedLable = "Inactive";
    debugger
    

    debugger;
    this.itemForm = this.fb.group({
      username: [item.user_name || '', Validators.required],
      first_name: [item.first_name || ''],
      last_name: [item.last_name || ''],
      email_id: [item.email_id || ''],
      phone_number: [item.contact_no || ''],
      role_id: [item.role_id || ''],
      position_id: [item.position_id || ''],
      distributor_code: [item.distributor_code || ''],
      userid: [item.userid || ''],
      is_active: [item.is_active],


    })
  }


  updateFunc(e) {
    

    if (e.checked = true) {
      this.CheckedLable = 'Active'
    }
    else {
      this.CheckedLable = "Inactive";
    }
  }

  setValue(i, e) {
    if (e.checked) {
      this.itemForm.value.is_active = 'true'
    } else {
      this.itemForm.value.is_active = 'false'
    }
  }


  OnselectedRole(value) {
    debugger  
    const DstCodeValidator = this.itemForm.get('distributor_code');

    if (value == 1) {
      this.DstCOdeDisabled = true;
    //  DstCodeValidator.setValidators(null);
     // DstCodeValidator.setValidators([Validators.required]);
      

    }
    else {
      this.DstCOdeDisabled = false;
     // DstCodeValidator.setValidators([Validators.required]);
    }
    this.GetPosition(value);




  }
  submit() {
    
  }

  oncalcel() {
    this.router.navigate(['pages/RegistrationList']);
  }

  save() {

    debugger;
    
    const DstCodeValidator = this.itemForm.get('distributor_code');
    if(this.itemForm.value.role_id == 1)
    {
      //alert('HI')
      //this.itemForm.get('distributor_code').clearValidators();
      DstCodeValidator.setValidators(null);
      DstCodeValidator.updateValueAndValidity();
    }
    else{
     // alert('HIf')
     // this.itemForm.get('distributor_code').setValidators(Validators.required)
      DstCodeValidator.setValidators([Validators.required]);
      DstCodeValidator.updateValueAndValidity();
    }


    if (this.itemForm.invalid) {
      return;
    }

    debugger

    //console.log(this.itemForm.value);


    this.click = this.CommonService.RegistrationSave(this.itemForm.value).subscribe(
      data => {

        debugger;
        if (data.success == true) {


          

          Swal.fire('Member Added!')
          this.router.navigate(['pages/RegistrationList']);

        }
        else {
          

          Swal.fire(data.error.data.msg)


        }
      }, (err) => {


        debugger;

      }

    );



  }



  update() {
    if (this.itemForm.invalid) {
      return;
    }
   


    const Json: Updateinfo = {} as Updateinfo;

    Json.action_type = "update_account";
    Json.account_pk = this.itemForm.value.userid;
    Json.role_id = this.itemForm.value.role_id;
    Json.first_name = this.itemForm.value.first_name;
    Json.phone_number = this.itemForm.value.phone_number;
    Json.email_id = this.itemForm.value.email_id;
    Json.last_name = this.itemForm.value.last_name;
    Json.position_id = this.itemForm.value.position_id;
    Json.distributor_code = this.itemForm.value.distributor_code;
    Json.is_active = this.itemForm.value.is_active;

   

    this.click = this.CommonService.RegistrationUpdate(Json).subscribe(
      data => {

        debugger;
        if (data.success == true) {


        

          Swal.fire('Updated Sucessfully!')
          this.router.navigate(['pages/RegistrationList']);

        }
        else {
          

          Swal.fire(data.error.data.msg)


        }
      }, (err) => {


        debugger;

      }

    );



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

