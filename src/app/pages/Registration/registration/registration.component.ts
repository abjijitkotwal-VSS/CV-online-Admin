import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';


import { CommonService } from '../../../shared/services/MyServices/common.service';
import { Subscription } from 'rxjs';

import { DataPassService } from '../../../shared/services/MyServices/data-pass.service'



@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  formData = {}
  console = console;
  basicForm: FormGroup;
  RoleType: any[];
  message: string;
  public datas;

  click: Subscription;
  constructor(private CommonService: CommonService
    , private data: DataPassService
  ) { }

  ngOnInit() {
    //this.data.currentMessage.subscribe(message => this.message = message)
    this.datas = this.data.getOption();

  




    this.basicForm = new FormGroup({
      username: new FormControl('', [
        Validators.minLength(4),
        Validators.maxLength(9)
      ]),
      first_name: new FormControl('', [
        // Validators.required
      ]),
      last_name: new FormControl('', [
        //Validators.required
      ]),
      email_id: new FormControl('', [
        //Validators.required,
        Validators.email
      ]),
      phone_number: new FormControl('', [
        Validators.required,
        // Validators.email
      ]),


      role_id: new FormControl()
    })



    this.GetRole();
  

   // this.binddata(this.datas)
  }
  binddata(item) {



  }


  GetRole() {

    this.CommonService.BindRoleType('').subscribe(

      data => {

        if (data.success == true) {
          //this.setSession(data);
          //  console.log(data);
          this.RoleType = data.data;
        }


        else {
          alert('hi');

          // Swal.fire('Oops...', 'incorrect username or password!', 'error')
        }
      }, (err) => {
        //  Swal.fire('Oops...',err.error.msg, 'error')
        //  console.log('error occured', err);
      }

    );




  }

  save() {
    if (this.basicForm.invalid) {
      return;
    }



    //  console.log(this.basicForm.value);


    this.click = this.CommonService.RegistrationSave(this.basicForm.value).subscribe(
      data => {

        debugger;
        if (data.success == true) {


          //this.setSession(data);

        }
        else {
          console.log(data);

        }
      }, (err) => {


        debugger;

      }

    );



  }
  ngOnDestroy() {
   // this.click.unsubscribe();
   // this.datas.unsubscribe();
   // this.CommonService.RegistrationSave.
  
   
  }





}


