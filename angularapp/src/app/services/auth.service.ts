import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http:HttpClient,private router:Router) { }
  private baseURL:string="https://8080-ecaffdaacfaecfeafbbfadbbbebdcbbbbcfcaaed.project.examly.io";
  userRegister(data:any){
    return this.http.post<any>(`${this.baseURL}/user/signup`,data);
  }
  adminRegister(data:any){
    return this.http.post<any>(`${this.baseURL}/admin/signup`,data);
  }
  userRegisterSendEmail(data:any){
    return this.http.post<any>(`${this.baseURL}/sendEmail`,data);
  }
  getAdminData(id:number){
    return this.http.get<any>(`${this.baseURL}/GetAdmin/${id}`);
  }
  getUserData(id:number){
    return this.http.get<any>(`${this.baseURL}/GetUser/${id}`);
  }
  login(data:any){
    return this.http.post<any>(`${this.baseURL}/user/login`,data);
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
