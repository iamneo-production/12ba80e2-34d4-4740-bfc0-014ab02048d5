import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AcademyService {
  private baseURL:string="https://8080-ecaffdaacfaecfeafbbfadbbbebdcbbbbcfcaaed.project.examly.io";
  constructor(private http: HttpClient) {}
  //ADMIN SERVICES
  //INSTITUTE
  addAcademy(data: any) {
    return this.http.post<any>(`${this.baseURL}/admin/addInstitute`, data);
  }
  getAcademy() {
    return this.http.get<any>(`${this.baseURL}/admin/viewInstitutes`);
  }
  getAcademyById(id: number) {
    return this.http.get<any>(`${this.baseURL}/GetInstituteID/${id}`);
  }
  updateAcademy(id: number, data: any) {
    return this.http.put<any>(`${this.baseURL}/admin/editInstitute/${id}`, data);
  }
  deleteAcademy(id: number) {
    return this.http.delete<any>(`${this.baseURL}/admin/deleteInstitutes/${id}`);
  }
  deleteAcademyCourse(id: number) {
    return this.http.delete<any>(`${this.baseURL}/DeleteAcademyCourse/${id}`);
  }

  //COURSES
  addCourse(data: any) {
    return this.http.post<any>(`${this.baseURL}/admin/addCourse`, data);
  }
  getCourse(id: any) {
    return this.http.get<any>(`${this.baseURL}/GetCourse/${id}`);
  }
  getAllCourses() {
    return this.http.get<any>(`${this.baseURL}/admin/viewCourse`);
  }
  updateCourse(id: any, data: any) {
    return this.http.put<any>(`${this.baseURL}/admin/editCourse/${id}`, data);
  }
  deleteCourse(id: any) {
    return this.http.delete<any>(`${this.baseURL}/admin/deleteCourse/${id}`);
  }
  //BOTH ADMIN AND USER CONTROL

  //ADMISSION

  addStudent(data: any) {
    return this.http.post<any>(`${this.baseURL}/user/addAdmission`, data);
  }
  getStudent() {
    return this.http.get<any>(`${this.baseURL}/GetStudents`);
  }
  getStudentDataById(id: number) {
    return this.http.get<any>(`${this.baseURL}/GetStudents/${id}`);
  }
  updateStudent(id: number, data: any) {
    return this.http.put<any>(`${this.baseURL}/user/editAdmission/${id}`, data);
  }
  deleteStudent(id: number) {
    return this.http.delete<any>(`${this.baseURL}/user/deleteAdmission/${id}`);
  }
  checkEnrolledCourse(data:any){
    return this.http.post<any>(`${this.baseURL}/checkCourseExists`,data);
  }
}
