import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoardService } from 'src/app/service/board.service';
import { Board } from 'src/app/board';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.css']
})
export class PostViewComponent implements OnInit {
  params:any;
  postId:number;
  post:Board;
  files:any;
  constructor(private route:ActivatedRoute, private boardService:BoardService) { 
    this.postId = this.route.snapshot.params['postId'];
  }

  ngOnInit(): void {
    console.log(this.postId);
    let resp= this.boardService.getPost(this.postId);
    resp.subscribe((post)=> {   
      this.post = post['post'];
      this.files = post['files'];
      console.log(this.post,"hhhhhhhhhhhhhhh");
      console.log(this.files,"ddddddddddddd");
    });
  }
}
