import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validator, Validators} from "@angular/forms";
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";
import {Message} from "primeng/api";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {ApiErrorArgsInvalid, ApiErrorTokenInvalid} from "../../core/model/error-response";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  passwordType = 'password';
  msgInvalid: Message[] = [];
  messages!: Message[];

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: []
    })
  }

  doLogin() {
    this.msgInvalid = [];
    if (this.loginForm.invalid) {
      this.msgInvalid = [
        {severity: 'error', summary: '', detail: 'Vui lòng nhập đủ tên đăng nhập và mật khẩu'},
      ];
      return;
    }
    if (!navigator.onLine){
      this.msgInvalid = [
        {severity: 'error', summary: '', detail: 'Kết nối mạng không ổn định, vui lòng kiểm tra lại'},
      ];
      return;
    }
    this.authService.login(this.loginForm.value).subscribe((res: any) => {
      if (res) {
        if(res && res.roles.includes('ROLE_ADMIN')){
        this.authService.setToken(res.id_token, new Date().getTime());
        this.goToView();
        }else {
           this.msgInvalid = [
        {severity: 'error', summary: '', detail: 'Bạn không có quyền truy cập hệ thống'},
      ];
        }
      }
    }, err => {
      if (err instanceof ApiErrorTokenInvalid){
      this.msgInvalid = [
        {severity: 'error', summary: '', detail: 'Tên đăng nhập hoặc mật khẩu không đúng'},
      ];
      }

    })
  }

  changeTypePass() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }

  goToView() {
    this.router.navigate(['/slot'])
  }
}
