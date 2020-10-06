import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CommentService } from 'src/app/service/comment.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-comment-dialog',
  templateUrl: './comment-dialog.component.html',
  styleUrls: ['./comment-dialog.component.css']
})
export class CommentDialogComponent implements OnInit {
comment:Comment;
  // MAT_DIALOG_DATA 공유 데이터 수신 
  constructor(public dialogRef: MatDialogRef<CommentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private service:CommentService,private router: Router) {
      this.comment = data;
     }

  ngOnInit(): void {
    
  }

  close() {
    this.dialogRef.close();
  }

  update(comment){
    console.log(comment['content']+ " 업데이트 컨텐");
    console.log(comment['cno']+ " 업데이트 컨텐");
    let resp=this.service.commentModify(comment['cno'],comment['content']);
    resp.subscribe((data)=>{
      if(resp != null){
        alert("수정되었습니다..");
        let postId = data;
        this.close();
        this.router.navigate(['/board/post/'+postId]);
       window.location.reload();
      }else{
        alert("수정실패");
        return 0;
      }
    });
  }

}
