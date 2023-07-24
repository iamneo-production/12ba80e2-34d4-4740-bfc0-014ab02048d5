import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AcademyService {
  AcademyURL ='https://8080-ecaffdaacfaecfeafbbfadbbbebdcecdaababeda.project.examly.io/api/Admin';
    
  

  constructor(private http: HttpClient) {}

  //ADMIN SERVICES

  //INSTITUTE
  addAcademy(data: any) {
    return this.http.post<any>(`${this.AcademyURL}/PostInstitute`, data);
  }
  getAcademy() {
    return this.http.get<any>(`${this.AcademyURL}/GetInstitute`);
  }
  getAcademyById(id: number) {
    return this.http.get<any>(`${this.AcademyURL}/GetInstituteID/${id}`);
  }
  updateAcademy(id: number, data: any) {
    return this.http.put<any>(`${this.AcademyURL}/PutInstitute/${id}`, data);
  }
  deleteAcademy(id: number) {
    return this.http.delete<any>(`${this.AcademyURL}/DeleteInstitute/${id}`);
  }
  deleteAcademyCourse(id: number) {
    return this.http.delete<any>(`${this.AcademyURL}/DeleteAcademyCourse/${id}`);
  }
}