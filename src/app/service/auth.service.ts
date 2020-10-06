import { Injectable, OnInit, EventEmitter, Output } from '@angular/core';
import { Subject} from 'rxjs';
import { UserRegistationService } from './user-registation.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  @Output() getLogInState: EventEmitter<any> = new EventEmitter();
  loginInfo:any;
  itemValue = new Subject<string>();
  currentUserSubject:any;
  currentUser2:any;
  constructor(private signService: UserRegistationService, private router: Router) {
    
   }
  ngOnInit(): void {
  }

  login(useremail: string, password: string) {
    this.signService.userLogin(useremail,password)
    .subscribe(response => {
      this.loginInfo = response;
      if(this.loginInfo != 0){
          alert("로그인성공");
          localStorage.setItem('loginId',useremail); 
          localStorage.setItem('loginName',this.loginInfo[0].name);
          this.getLogInState.emit('loggedIn');
          console.log(this.loginInfo[0].name);
          this.router.navigate(['/search']);        
      }else{
        alert("아이디 또는 비밀번호 불일치");
      } 
    });
   
  }

  logout(): void {
    localStorage.removeItem('loginId');
    localStorage.removeItem('loginName');
    this.getLogInState.emit('notLogged');
  }
 
  isLoggedIn(): boolean {
    var token = localStorage.getItem("loginId");
    if(token) return true;
    else return false;
  }
}
