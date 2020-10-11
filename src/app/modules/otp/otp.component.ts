import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
})
export class OtpComponent implements OnInit {
  otpForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error: string;
  _data: any;
  _otp: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    if (this.authenticationService.currentUser) this.router.navigate(['/otp']);

    this.authenticationService
      .getOTP()
      .pipe(first())
      .subscribe(
        (data) => {
          console.log('Data checks => ' + JSON.stringify(data));
          this._data = data;
          this._otp = data;
        },
        (error) => {
          console.log('Error Data Check => ' + error);
          this.error = error;
          this.loading = false;
        }
      );
  }

  ngOnInit(): void {
    this.otpForm = this.formBuilder.group({
      otp: ['', Validators.required],
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() {
    return this.otpForm.controls;
  }

  async onSubmit() {
    this.submitted = true;

    if (this.otpForm.invalid) return;

    this.loading = true;

    if (this.f.otp.value == this._data) {
      console.log('Is equal');
      //this.router.navigate(['home']);
      this.router.navigate(['dashboard']);
      console.log(this.returnUrl);
    } else {
      console.log('Is not equal');
    }
  }

  async onResendOtp() {
    this.authenticationService
      .getOTP()
      .pipe(first())
      .subscribe(
        (data) => {
          console.log('Data checks =!> ' + JSON.stringify(data));
          this._data = data;
          this._otp = data;
        },
        (error) => {
          console.log('Error Data Check =!> ' + JSON.stringify(error));
          this.error = error;
          this.loading = false;
        }
      );
  }
}
