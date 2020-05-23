import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormBuilder, AbstractControl, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { invalid } from '@angular/compiler/src/render3/view/util';
function userNameValidator(control: FormControl): { [s: string]: boolean } {
  if (!control.value.match(/^a/)) {
    return { invalidUser: true };
  }
}
@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {
  myForm: FormGroup;
  userName: AbstractControl;//输入用户名的控件
  password: AbstractControl;//输入密码的控件
  name$: Observable<string>;
  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.myForm = this.fb.group({
      'userName': ['', Validators.compose([Validators.required, userNameValidator])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(5)])]
    });
    this.userName = this.myForm.controls['userName'];
    this.password = this.myForm.controls['password'];
    this.name$ = this.userName.valueChanges;
  }
  ngOnInit(): void {
  }
  login() {
    if (this.userName.value === "aaa" && this.password.value === "123456")
      this.authService.login();
    else
      this.authService.logout();
  }



}

