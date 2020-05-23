import { CustomValidators } from 'ng2-validation';
import { ErrorStateMatcher } from '@angular/material/core';
import { Validators, FormGroup, NgForm, FormGroupDirective, FormControl, AbstractControl, ValidationErrors } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { Component, OnInit } from "@angular/core";

// import {Services} from '../../../shared/services/DIndiaServices/Services'
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: "app-signup2",
  templateUrl: "./signup2.component.html",
  styleUrls: ["./signup2.component.scss"]
})
export class Signup2Component implements OnInit {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder,private router: Router,) {}

  ngOnInit() {

    const password = new FormControl('', Validators.required);
    const confirmPassword = new FormControl('', CustomValidators.equalTo(password));

    this.signupForm = this.fb.group(
      {
        firstName: ["",Validators.required],
        lastName: ["",Validators.required],
        username: ["",Validators.required],
        email: ["",[Validators.required,Validators.email]],
        password: password,
        confirmPassword: confirmPassword,
        agreed: [false,Validators.required]
      }
    );
  }

  

  // onSubmit() {
  //   if (!this.signupForm.invalid) {
  //     // do what you wnat with your data
  //     console.log(this.signupForm.value);
      
  //   this.CommonService.UserRegistration(this.signupForm.value).subscribe(
  //     data => {

  //       debugger;
  //       console.log(data);
  //       if (data.ResponseCode == "00") {

          


          

  //          Swal.fire(data.ResponseMessage)
  //          //sessions/signin2
  //          this.router.navigate(['sessions/signin2']);

  //       }
  //       else {
          
  //         Swal.fire(data.ResponseMessage)
  //         //Swal.fire(data.error.data.msg)


  //       }
  //     }, (err) => {


  //       debugger;

  //     }

  //   );
  //   }


  // }
}