import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AcademyService {
  AcademyURL =
  'https://8080-ecaffdaacfaecfeafbbfadbbbebdcecdaababeda.project.examly.io';
  StudentURL =
  'https://8080-ecaffdaacfaecfeafbbfadbbbebdcecdaababeda.project.examly.io';

  constructor(private http:HttpClient) { }

  //INSTITUTE
  addAcademy(data: any) {
    return this.http.post<any>(`${this.AcademyURL}/admin/addInstitute`, data);
  }
  
  //Students
  getStudentDataById(id: number) {
    return this.http.get<any>(`${this.StudentURL}/GetStudents/${id}`);
  }
  updateStudent(id: number, data: any) {
    return this.http.put<any>(`${this.StudentURL}/user/editAdmission/${id}`, data);
  }
}
