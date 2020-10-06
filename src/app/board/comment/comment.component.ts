import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Comment } from 'src/app/comment';
import { CommentService } from 'src/app/service/comment.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CommentDialogComponent } from '../comment-dialog/comment-dialog.component';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
 @Input()
 postId:number;

  comment: Comment=new Comment(0,0,"","","","");
  commentObj:any;
  writer:string;
  content:string;
  sessionEmail:string;
  pageIndex :any = 5;
  filteredArray: any[] = [];
  sortArray: any[] = [];
  defaultRecords:any = 5;
  dataSize:any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;   
  dataSource: MatTableDataSource<Comment> = new MatTableDataSource<Comment>(this.commentObj);
  constructor(private service:CommentService,private router: Router,private matDialog:MatDialog
    ) { 
     
    }

  ngOnInit(): void {
    this.sessionEmail = localStorage.getItem('loginId');

    let resp=this.service.getCommentList(this.postId);
    resp.subscribe((data)=>{
      this.commentObj=data;
      console.log(this.commentObj+ " COMMENT ");
      
      this.commentObj.sort((b: any, a: any) => { return Date.parse(a.createDate) - Date.parse(b.createDate) });
      this.filteredArray = this.commentObj.slice(0,this.pageIndex);

      console.log("sort ori " + this.filteredArray);
      console.log("sort new " + this.sortArray);

      let resp2=this.service.commentCount(this.postId);
      resp2.subscribe((data)=>{
        this.dataSize = data;
        console.log("datasize  "+this.dataSize);
      });

    });
  }

  onPageChange($event) {
    this.filteredArray = this.commentObj.slice($event.pageIndex*$event.pageSize, $event.pageIndex*$event.pageSize + $event.pageSize);
    this.pageIndex=$event.pageSize
  }

  commentReg(): void{
    this.comment['bno'] = this.postId;
    this.comment['writer'] = this.sessionEmail;
    this.comment['content'] = this.content;

    console.log(this.commentObj+ " comobj");

    let resp=this.service.commentRegistration(this.comment);
    resp.subscribe((data)=>{
      if(resp != null){
        alert("등록되었습니다.");
        this.content = null;
        this.ngOnInit();
      }
    });
  }

  openDialog(cno):void {

    let resp=this.service.getCommentByCno(cno);
    resp.subscribe((data)=>{ 
      let comment = data;
      const dialogConfig = new MatDialogConfig();;
      dialogConfig.data = comment;
      console.log(comment['content']+ " comment obj ");
      this.matDialog.open(CommentDialogComponent, dialogConfig);
    });
  }
  delete(cno):void{
    if(confirm('삭제하시겠습니까?')){
     let resp=this.service.deleteComment(cno);
     resp.subscribe((data)=>{ 
     });
     window.location.reload();
    }
  }

}
