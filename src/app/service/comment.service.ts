import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http:HttpClient) { }

  public commentRegistration(comment){
    return this.http.post("http://localhost:9090/comment/",comment,{responseType:'text' as 'json'});
  }

  public getCommentList(bno){
    return this.http.get("http://localhost:9090/comment/all/"+bno);
  }

  public getCommentByCno(cno){
    return this.http.get("http://localhost:9090/comment/"+cno);
  }

  public deleteComment(cno){
    return this.http.delete("http://localhost:9090/comment/"+cno);
  }

  // public getComment(cno) {
  //   return this.http.get("http://localhost:9090/comment/post/"+cno);
  // }
  
  public commentModify(cno,comment){
    return this.http.put("http://localhost:9090/comment/"+cno,comment,{responseType:'text' as 'json'});
  }

  public commentCount(bno){
    return this.http.get("http://localhost:9090/comment/count/"+bno);
  }
}
