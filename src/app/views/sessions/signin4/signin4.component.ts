import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { Router } from '@angular/router';
import { AuthorizeService } from "../../../shared/services/MyServices/authorize.service";
// import Swal from 'sweetalert2';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signin4',
  templateUrl: './signin4.component.html',
  styleUrls: ['./signin4.component.scss'],
  animations: egretAnimations
})
export class Signin4Component implements OnInit {

  signupForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder,
    private loader: AppLoaderService,
    private AuthService: AuthorizeService) { }

  ngOnInit() {
debugger;
    const password = new FormControl('', Validators.required);
    const confirmPassword = new FormControl('', CustomValidators.equalTo(password));

    this.signupForm = this.fb.group(
      {
        username: ["", Validators.required],
        password: ["", Validators.required],
        // agreed: [false, Validators.required],
        // device_id: "87946545616461316846169845161148461616844616",
        // app_version: "0.01",
        // app_name: "com.tatamotors.egurucrm"
      }
    );
  }

  onSubmit() {
    if (!this.signupForm.invalid) {
      this.loader.open();
      // do what you wnat with your data
      // console.log(this.signupForm.value);
      debugger;
      this.AuthService.loginAuth(this.signupForm.value).subscribe(

        data => {
          console.log(data);
          if (data.success == true) {

            this.setSession(data);
            
            this.router.navigate(['pages/Dashboard']);
            this.loader.close();
          }


          else {
            this.loader.close();
            // alert('hi');
            // Swal.fire('Oops...', 'incorrect username or password!', 'error')
            Swal.fire('Oops...', 'incorrect username or password!', 'error')
          }
        }, (err) => {
          this.loader.close();
          //  Swal.fire('Oops...',err.error.msg, 'error')
          // console.log('error occured', err);
          // Swal.fire(err.error.data.msg);
          Swal.fire('Oops...', 'incorrect username or password!', 'error')
        }

      );

    }
  }
  setSession(data: any) {
    //localStorage.setItem('token', JSON.stringify(data.token.access_token));
    localStorage.setItem('token', data.data.token.access_token);
    //console.log(data.data.token.access_token + 'Token')
    localStorage.setItem('loginData', JSON.stringify(data.data));
    console.log(data.data);
    //console.log(data.data.page_list);
    //const time_to_login = Date.now() + data.token.expires_in;
    //localStorage.setItem('timer', JSON.stringify(time_to_login));
    localStorage.setItem('PageDetails', JSON.stringify(data.data.page_list));
    
localStorage.setItem('ORGName', data.data.account_info.organization_name);
    let Minutes = data.data.token.expires_in * 1000;
    let date1 = new Date();
    let date2 = new Date(date1.getTime() + Minutes);
    localStorage.setItem('timer', JSON.stringify(date2));


    //console.log(JSON.stringify(data));

  }
}
