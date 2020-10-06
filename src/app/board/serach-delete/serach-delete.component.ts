import { Component, OnInit, ViewChild } from '@angular/core';
import { BoardService } from '../../service/board.service';
import { AppComponent } from '../../app.component';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-serach-delete',
  templateUrl: './serach-delete.component.html',
  styleUrls: ['./serach-delete.component.css']
})
export class SerachDeleteComponent implements OnInit {

  board:any;
  sessionEmail:string;
  displayedColumns = ["id", "title", "email","createDate","updateDate"];
  dataSource = new MatTableDataSource();
  selectedPage : number = 0;
  pageClient: any;
  page : number = 0;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;   
  constructor(private service:BoardService, private app:AppComponent, private router:Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this.sessionEmail = localStorage.getItem('loginId');

    let resp=this.service.getAllBoard();
    resp.subscribe((data)=>{
      this.board=data;
      this.dataSource = new MatTableDataSource(this.board);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public deletePost(postId:number){
    if(confirm('삭제하시겠습니까?')){
     let resp= this.service.deletePost(postId);
       resp.subscribe((data)=> { 
       this.router.navigate(['/search']); 
       this.ngOnInit();
     });
    }else{
     
    }
   }
}
