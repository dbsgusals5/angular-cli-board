import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BoardService } from 'src/app/service/board.service';
import { Board } from 'src/app/board';
import { Router } from '@angular/router';
import { User } from 'src/app/user';
import { UserRegistationService } from 'src/app/service/user-registation.service';
@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  user: User=new User("","","",0,"");
  message:any;
  userForm: FormGroup;
  constructor(private router: Router,private formBuilder: FormBuilder, private userService:UserRegistationService ) { 
    this.userForm = this.formBuilder.group({
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required]),
      name: new FormControl('',[Validators.required]),
      experience: new FormControl('',[Validators.required]),
      domain: new FormControl('',[Validators.required])
   });
  }

  get f() { return this.userForm.controls; }

  ngOnInit(): void {
  }

  submit() {
    alert(this.userForm.value.email);

    let idCheck = this.userService.getUserByEmail(this.userForm.value.email);
    idCheck.subscribe((data)=> { 
      this.message=data;
        if(Object.keys(data).length > 0){
          alert("아이디 중복");
        }else{
          let resp=this.userService.doRegistration(this.userForm.value);
          resp.subscribe((data)=> { 
            if(resp != null){
              alert("가입완료");
             this.router.navigate(['/signin']);
             }else{
           alert("수정실패");
             }
          });
        }
    }); 
   }

 }

