import { Component} from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  //signInForm: FormGroup;
  useremail: string;
  password: string;
  loginInfo: any;
  constructor(public authService: AuthService) {
   
  }
  
  loginClick() {
      this.authService.login(this.useremail,this.password);       
  }

 

  
}