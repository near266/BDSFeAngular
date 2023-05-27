import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validator, Validators} from "@angular/forms";
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";
import {Message} from "primeng/api";

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
    this.messages = [
      {severity: 'success', summary: 'Success', detail: 'Message Contentaaa'},
    ];
  }

  initForm() {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: []
    })
  }

  doLogin() {
    if (this.loginForm.invalid) {
      this.msgInvalid = [
        {severity: 'error', summary: '', detail: 'Thông tin đăng nhập không hợp lệ'},
      ];
    }
    this.authService.login(this.loginForm.value).subscribe((res: any) => {
      if (res) {
        this.authService.setToken(res.id_token, new Date().getTime());
        this.goToView();
      }
    })
  }

  changeTypePass() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }

  goToView() {
    this.router.navigate([''])
  }
}
