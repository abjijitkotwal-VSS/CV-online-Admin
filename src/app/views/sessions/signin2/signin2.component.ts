import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
// import { Services } from '../../../shared/services/DIndiaServices/Services'
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin2',
  templateUrl: './signin2.component.html',
  styleUrls: ['./signin2.component.scss']
})
export class Signin2Component implements OnInit {

  signupForm: FormGroup;
  datas: any;

  constructor(private fb: FormBuilder,  private router: Router, ) { }

  ngOnInit() {

    const password = new FormControl('', Validators.required);
    const confirmPassword = new FormControl('', CustomValidators.equalTo(password));

    this.signupForm = this.fb.group(
      {
        MobileNo: ["", [Validators.required, Validators.maxLength]],
        password: password,
        agreed: [false, Validators.required]
      }
    );
  }

  // onSubmit() {
  //   if (!this.signupForm.invalid) {
  //     // do what you wnat with your data





  //     console.log(this.signupForm.value);


  //     this.CommonService.UserLogin(this.signupForm.value).subscribe(
  //       data => {

  //         debugger;
  //         console.log(data);
  //         if (data.ResponseCode == "00") {




  //           this.datas = JSON.parse(data.ResponseData);
  //           console.log('this.datas');
  //           console.log(this.datas);
  //        //   Swal.fire(data.ResponseMessage)
  //         //  alert(this.datas[0].s_FirstName);
  //           localStorage.setItem('Name', (this.datas[0].s_FirstName +  ' ' +this.datas[0].s_Lastname) );
  //           localStorage.setItem('MobileNo', this.datas[0].s_username);
  //           localStorage.setItem('Role', this.datas[0].Role);

  //           //sessions/signin2
  //           this.router.navigate(['pages/DiscussionBoard']);

  //         }
  //         else {

  //           Swal.fire("Invalid User Name / Password")
  //           //Swal.fire(data.error.data.msg)


  //         }
  //       }, (err) => {


  //         debugger;

  //       }

  //     );


  //   }
  // }
}
