import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_service';
import { first } from 'rxjs/operators';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-reg-user',
  templateUrl: './reg-user.component.html',
  styleUrls: ['./reg-user.component.scss'],
})
export class RegUserComponent implements OnInit {
  user: User;
  registerForm: FormGroup;
  public regInvalid: boolean;
  //public gender: 'Male' | 'Female' | 'Other';
  gender = '';
  genders: any = ['Male', 'Female', 'Other'];
  private formSubmitAttempt: boolean;
  submitted = false;
  loading = false;
  private returnUrl: string;
  formState = true;
  error: string;
  _data: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    if (this.authenticationService.currentUserValue)
      this.router.navigate(['/reg-user']);
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      gender: ['', Validators.required],
      age: [null, [Validators.required, Validators.min(2)]],
      username: ['', Validators.required],
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ]),
      ],
      password: ['', Validators.required],
      re_password: ['', Validators.required],
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    //console.log('HHH '+this.route.snapshot.queryParams['returnUrl'])
    console.log('Hey:: ' + this.returnUrl);
  }

  get f() {
    return this.registerForm.controls;
  }

  async onSubmit() {
    this.submitted;

    console.log('before');
    console.log(this.registerForm.value);
    console.log('after ' + this.registerForm.valid);

    if (this.registerForm.valid) {
      this.loading = true;

      this.user = this.registerForm.value;

      //console.log(this.form.get('fname's));
      this.formState = true;

      this.authenticationService
        .createUser(this.user)
        .pipe(first())
        .subscribe(
          (data) => {
            console.log('Data checks => ' + JSON.stringify(data));
            //change the url to redirent to otp page
            this.router.navigate(['/otp']);
            console.log(this.returnUrl);
          },
          (error) => {
            console.log('Error checks => ' + JSON.stringify(error));
            this.error = error;
            this.loading = false;
          }
        );
    } else {
      this.formState = true;
      console.log('please fill your form correct');
    }
  }

  getgender(g: any) {
    this.gender = g.target.value;
    console.log(g.target.value);
  }
}
