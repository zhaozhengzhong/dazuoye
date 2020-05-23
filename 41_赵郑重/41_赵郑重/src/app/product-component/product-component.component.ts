import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from './user';

@Component({
  selector: 'app-product-component',
  templateUrl: './product-component.component.html',
  styleUrls: ['./product-component.component.css']
})
export class ProductComponentComponent implements OnInit {

  myForm: FormGroup;
  userName: AbstractControl;
  id: AbstractControl;
  password: AbstractControl;
  users: Observable<User>;
  baseUrl = 'http://127.0.0.1:8080/'
  users$: Observable<User>;
  currentUser: User;
  constructor(private fb: FormBuilder, private httpClient: HttpClient) {
    this.myForm = this.fb.group({
      'userName': [''],
      'password': [''],
      'id': [''],
    });
    this.userName = this.myForm.controls['userName'];
    this.password = this.myForm.controls['password'];
    this.id = this.myForm.controls['id'];
  }
  ngOnInit(): void {
    this.users$ = <Observable<User>>this.httpClient.get(this.baseUrl + 'sbs');
  }
  search() {

    if (this.id.value) {
      this.users$ = <Observable<User>>this.httpClient.get(this.baseUrl + 'sbs/' + this.id.value);
    }
    else {
      this.users$ = <Observable<User>>this.httpClient.get(this.baseUrl + 'sbs');
    }
  }

  add() {
    console.log(this.myForm.value);
    this.httpClient.post(this.baseUrl + 'sb',
      this.myForm.value).subscribe(
        (val: any) => {
          if (val.succ) {
            alert('添加成功!');
          }
        }
      );
  }
  select(u: User) {
    this.currentUser = u;
    this.myForm.setValue(this.currentUser);
  }

  delete() {
    if (!this.currentUser) {
      alert('必须先选择用户!');
    } else {
      this.httpClient.delete(this.baseUrl + 'sb/' + this.currentUser.id).subscribe(
        (val: any) => {
          if (val.succ) {
            alert('删除成功!');
          }
        }
      );
    }
  }

  update() {
    if (!this.currentUser) {
      alert('必须先选择用户!');
    }
    else {
      this.httpClient.put(this.baseUrl + 'sb',
        this.myForm.value).subscribe(
          (val: any) => {
            if (val.succ) {
              alert('修改成功!');
            }
          }
        )
    }
  }
}
