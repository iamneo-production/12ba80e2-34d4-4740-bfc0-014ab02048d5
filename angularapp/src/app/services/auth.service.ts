import { HttpClient, HttpClientModule} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService ,JwtModule} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http:HttpClient,private router:Router) { }
  private baseURL:string="https://8080-ecaffdaacfaecfeafbbfadbbbebdcecdaababeda.project.examly.io/api/Auth";

  userRegister(data:any){
    return this.http.post<any>(`${this.baseURL}/userRegister`,data);
  }
  adminRegister(data:any){
    return this.http.post<any>(`${this.baseURL}/adminRegister`,data);
  }
  userLogin(data:any){
    return this.http.post<any>(`${this.baseURL}/userLogin`,data);
  }
  adminLogin(data:any){
    return this.http.post<any>(`${this.baseURL}/adminLogin`,data);
  }

  storeToken(tokenValue: string){
    localStorage.setItem('token',tokenValue);
  }
  getToken(){
    return localStorage.getItem('token');
  }
  isLoggedIn():boolean{
    return !!localStorage.getItem('token')
  }
  signout(){
    localStorage.clear();
    this.router.navigate(['login']);
  }
  decodedToken(){
    const jwtHelper =new JwtHelperService();
    const token=this.getToken();
    return jwtHelper.decodeToken(token);
  }
  getID(){
    const x=this.decodedToken();
    return x['nameid'];
  }
  getRole(){
    const x=this.decodedToken();
    return x['role'];
  }
}