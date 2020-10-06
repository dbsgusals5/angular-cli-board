import { Component, OnInit } from '@angular/core';
import { User } from '../../user';
import { Board } from '../../board';
import { UserRegistationService } from '../../service/user-registation.service';
import { BoardService } from '../../service/board.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  board: Board=new Board(0,"","","",0,"","","","");
  message:any;
  email:string;
  name:string;
  selectedFiles:FileList;
  files:File;;
  progress: { percentage: number } = { percentage: 0 };
  currentFileUpload: File;
  bno:any;
  constructor(private service:BoardService,private router: Router) { }

  ngOnInit() {
    this.email = localStorage.getItem('loginId');
    this.name = localStorage.getItem('loginName');
    console.log(this.name);
    console.log(this.email);
  }
  public registerNow(){

    console.log(this.files,"file");
    this.board['email'] = this.email;
    this.board['name'] = this.name;
    console.log(this.board);
    
let resp=this.service.boardRegistration(this.board);
resp.subscribe((data)=> { 
      this.bno=data
      if(resp != null){
        alert("등록되었습니다.");
        this.router.navigate(['/search']);
        console.log(this.bno);  
         if(this.selectedFiles.length > 0){
           console.log(this.selectedFiles.length,"length");
           console.log(this.selectedFiles,"itemzz");
          let resp2=this.service.boardFileUpload(this.bno,this.selectedFiles);
           resp2.subscribe((data)=> { 
            this.message = data;
            alert(this.message);
           });
         }
      }else{
        alert("등록실패");
      }
    });
   
  }
  selectFile(event) {
    this.selectedFiles = event.target.files || [];
  }
}
