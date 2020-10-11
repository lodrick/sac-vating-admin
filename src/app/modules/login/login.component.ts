import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  public loginInvalid: boolean;
  //private formSubmitAttempt: boolean;
  submitted = false;
  loading = false;
  private returnUrl: string;
  error: string;
  _data: any;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    if (this.authenticationService.currentUserValue)
      this.router.navigate(['/']);
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    //console.log('HHH '+this.route.snapshot.queryParams['returnUrl'])
    console.log('Hey:: ' + this.returnUrl);
  }

  get f() {
    return this.form.controls;
  }

  async onSubmit() {
    this.submitted = true;

    if (this.form.invalid) return;

    this.loading = true;
    this.authenticationService
      .login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        (data) => {
          console.log('Data checks => ' + JSON.stringify(data));
          //change the url to redirent to otp page
          this.router.navigate(['otp']);
          console.log(this.returnUrl);
        },
        (error) => {
          console.log('Error checks => ' + JSON.stringify(error));
          this.error = error;
          this.loading = false;
        }
      );
  }
}
