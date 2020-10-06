import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserRegistationService {

  constructor(private http:HttpClient) { }

  l

  public doRegistration(user){
    return this.http.post("http://localhost:9090/user",user,{responseType:'text' as 'json'});
  }

  
  public getUsers(){
    return this.http.get("http://localhost:9090/user");
  }
  
  
  public getUserByEmail(email){
    return this.http.get("http://localhost:9090/user/"+email);
  }
  
  public deleteUser(id){
    return this.http.delete("http://localhost:9090/user/"+id);
  }
  
  public userLogin(email,password) {
    return this.http.post("http://localhost:9090/user/"+email,password);
  } 
  
}
