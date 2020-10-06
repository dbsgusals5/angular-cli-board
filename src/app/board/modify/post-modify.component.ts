import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BoardService } from 'src/app/service/board.service';
import { Board } from 'src/app/board';
import { Router } from '@angular/router';
@Component({
  selector: 'app-post-modify',
  templateUrl: './post-modify.component.html',
  styleUrls: ['./post-modify.component.css']
})
export class PostModifyComponent implements OnInit {
  postId: number;
  post = {} as Board;
  files:any;
  postForm: FormGroup;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private boardService: BoardService,
    private formBuilder: FormBuilder) {
      this.postId = this.route.snapshot.params['postId'];
      this.postForm = this.formBuilder.group({
         title: new FormControl('',[Validators.required]),
         content: new FormControl('',[Validators.required])

      });
     }

get f() { return this.postForm.controls; }

  ngOnInit(): void {
    console.log(this.postId);
    let resp= this.boardService.getPost(this.postId);
    resp.subscribe((post)=> { 
      this.post = post['post'];
      this.files = post['files'];
      console.log(this.post);
    });
  }

  submit() {
    let resp=this.boardService.postModify(this.postId,this.post);
  resp.subscribe((data)=> { 
      if(resp != null){
        alert("수정되었습니다..");
        this.router.navigate(['/board/post/'+this.postId]);
      }else{
        alert("수정실패");
        this.router.navigate(['/search']);
      }
    });
  }
}
