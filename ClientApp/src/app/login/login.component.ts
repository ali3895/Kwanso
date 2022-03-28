import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuService } from '../menu.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public baseUrl: string;
  public validUser: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private menuService: MenuService,
    private formBuilder: FormBuilder,
    @Inject('BASE_URL') baseUrl: string
  ) {
    this.baseUrl = baseUrl;
  }


  ngOnInit(): void {
    this.createForm();
  }

  public createForm() {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: ['']
    });
  }

  public login_OnClick() {
    const obj = {
      Email: this.loginForm.controls['email'].value,
      Password: this.loginForm.controls['password'].value
    }
    this.http
      .post<any>(this.baseUrl + 'weatherforecast/login', obj)
      .subscribe(result => {
        if (result === null) {
          this.validUser = true;
        }
        else {
          localStorage.setItem("token", result.token);
          this.menuService.isSignedIn.next(true);
          this.router.navigate(['/list-tasks']);
        }
      }
        //error => console.error(error)
      );
  }
}
