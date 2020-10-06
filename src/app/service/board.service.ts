import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';
import { JsonPipe } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(private http:HttpClient) { }

  public boardRegistration(board){
    return this.http.post("http://localhost:9090/board",board,{responseType:'text' as 'json'});
  }

  public boardFileUpload(bno,file){
    const formData: FormData = new FormData();
    
    for(var i=0; i<2; i++){
      formData.append("file",file[i]);
    }
    console.log(file,"file list?");
    formData.append("bno",bno)
    return this.http.post("http://localhost:9090/board/file",formData,{responseType:'text' as 'json'});
  }

  public getAllBoard(){
    return this.http.get("http://localhost:9090/board");
  }

  public deletePost(postId){
    return this.http.delete("http://localhost:9090/board/"+postId);
  }

  public getPost(postId) {
    return this.http.get("http://localhost:9090/board/"+postId);
  }
  
  public postModify(postId,board){
    return this.http.put("http://localhost:9090/board/"+postId,board,{responseType:'text' as 'json'});
  }

  public fileDownload(bno,fno){
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8');
   
    const formData: FormData = new FormData();
   
    JSON.parse(fno)

    return this.http.get("http://localhost:9090/file/"+fno, {headers: {
      responseType:'blob'}
      
  });
  }
}
