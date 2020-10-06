import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import { Router} from '@angular/router';
import { MatPaginatorIntl } from '@angular/material/paginator';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit  {
  title = 'user-registration-client';
  email:string;
  loginInfo:any;
  loginCk:boolean;
  current:any;
  loginStateParam:string;
  loginState:string;
  now:any;
  setupTime:any;
  constructor(public router: Router,public authService: AuthService) {
    this.loginState = localStorage.getItem('loginState');
    authService.getLogInState.subscribe(state => this.changeName(state));
  }

  private changeName(state: string): void {
    this.loginStateParam = state;
    localStorage.setItem('loginState',this.loginStateParam);
    this.loginState = localStorage.getItem('loginState');
  }

  ngOnInit() {
    this.timeOutCheck();
    this.loginCk = this.loginCheck(); 
  }
  //로그인 세션 처리
  timeOutCheck(): void{
    let hours = 24;
    this.now = new Date().getTime();
    console.log(this.now);
    this.setupTime = localStorage.getItem('setupTime');
    
    if(this.setupTime == null){
      localStorage.setItem('setupTime',this.now);
    }else{
      if(this.now - this.setupTime > hours*60*60*500){
        localStorage.clear();
        this.loginState = localStorage.getItem('loginState');
        localStorage.setItem('setupTime',this.now);
      }
    }
  }

  logout(): void {
    console.log("Logout");
    this.authService.logout();
    localStorage.removeItem('loginId2');
    this.router.navigate(['/signin']);
  }
  loginCheck(): boolean{
    if(this.loginInfo == "true"){
      return true;
    }
    return false;
  }
}
