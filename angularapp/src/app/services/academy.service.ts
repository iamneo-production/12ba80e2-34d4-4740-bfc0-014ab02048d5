import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AcademyService {
  AcademyURL =
    'https://8080-ecaffdaacfaecfeafbbfadbbbebdcecdaababeda.project.examly.io';
  CourseURL =
    'https://8080-ecaffdaacfaecfeafbbfadbbbebdcecdaababeda.project.examly.io';
  StudentURL =
    'https://8080-ecaffdaacfaecfeafbbfadbbbebdcecdaababeda.project.examly.io';

  constructor(private http: HttpClient) {}

  //ADMIN SERVICES

  //INSTITUTE
  addAcademy(data: any) {
    return this.http.post<any>(`${this.AcademyURL}/PostInstitute`, data);
  }
  getAcademy() {
    return this.http.get<any>(`${this.AcademyURL}/admin/viewInstitutes`);
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

  //COURSES
  addCourse(data: any) {
    return this.http.post<any>(`${this.CourseURL}/PostCourse`, data);
  }
  getCourse(id: any) {
    return this.http.get<any>(`${this.CourseURL}/GetCourse/${id}`);
  }
  getAllCourses() {
    return this.http.get<any>(`${this.CourseURL}/admin/viewCourse`);
  }
  updateCourse(id: any, data: any) {
    return this.http.put<any>(`${this.CourseURL}/PutCourse/${id}`, data);
  }
  deleteCourse(id: any) {
    return this.http.delete<any>(`${this.CourseURL}/DeleteCourse/${id}`);
  }
  //BOTH ADMIN AND USER CONTROL

  //ADMISSION

  addStudent(data: any) {
    return this.http.post<any>(`${this.StudentURL}/postStudent`, data);
  }
  getStudent() {
    return this.http.get<any>(`${this.StudentURL}/GetStudents`);
  }
  getStudentDataById(id: number) {
    return this.http.get<any>(`${this.StudentURL}/GetStudents/${id}`);
  }
  updateStudent(id: number, data: any) {
    return this.http.put<any>(`${this.StudentURL}/updateStudent/${id}`, data);
  }
  deleteStudent(id: number) {
    return this.http.delete<any>(`${this.StudentURL}/deleteStudent/${id}`);
  }
  checkEnrolledCourse(data:any){
    return this.http.post<any>(`${this.StudentURL}/checkCourseExists`,data);
  }
}
