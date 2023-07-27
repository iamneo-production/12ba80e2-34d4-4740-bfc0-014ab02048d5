import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AcademyService {
  AcademyURL =
    'https://8080-ecaffdaacfaecfeafbbfadbbbebdcecdaababeda.project.examly.io';

  constructor(private http: HttpClient) {}

  getAcademy() {
    return this.http.get<any>(`${this.AcademyURL}/admin/viewInstitutes`);
  }
  getAcademyById(id: number) {
    return this.http.get<any>(`${this.AcademyURL}/GetInstituteID/${id}`);
  }


  
}
