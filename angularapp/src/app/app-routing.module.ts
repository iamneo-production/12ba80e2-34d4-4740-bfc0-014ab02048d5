import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddInstituteComponent } from './components/admin/adminacademy/add-institute/add-institute.component';
import { AdminacademyComponent } from './components/admin/adminacademy/adminacademy.component';
import { EditInstituteComponent } from './components/admin/adminacademy/edit-institute/edit-institute.component';
import { AddCourseComponent } from './components/admin/admincourse/add-course/add-course.component';
import { EditCourseComponent } from './components/admin/admincourse/edit-course/edit-course.component';
import { ViewCourseComponent } from './components/admin/admincourse/view-course/view-course.component';
import { ViewInstituteCourseComponent } from './components/admin/admincourse/view-course/view-institute-course/view-institute-course.component';
import { AddStudentComponent } from './components/admin/adminstudent/add-student/add-student.component';
import { EditStudentComponent } from './components/admin/adminstudent/edit-student/edit-student.component';
import { ViewStudentComponent } from './components/admin/adminstudent/view-student/view-student.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AddAdmissionComponent } from './components/user/enrolledcourse/add-admission/add-admission.component';
import { EditAdmissionComponent } from './components/user/enrolledcourse/edit-admission/edit-admission.component';
import { EnrolledcourseComponent } from './components/user/enrolledcourse/enrolledcourse.component';
import { UserNavbarComponent } from './components/user/user-navbar/user-navbar.component';
import { ViewacademyComponent } from './components/user/viewacademy/viewacademy.component';
import { ViewcoursesComponent } from './components/user/viewacademy/viewcourses/viewcourses.component';
import { AuthGuard } from './gaurds/auth.guard';

const routes: Routes = [
  {path:'', redirectTo:'login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'user-navbar',component:UserNavbarComponent,canActivate:[AuthGuard]},
  

  {path:'admin/viewInstitutes',component:AdminacademyComponent,canActivate:[AuthGuard]},
  {path:'admin/addInstitute',component:AddInstituteComponent,canActivate:[AuthGuard]},
  {path:'admin/editInstitute/:id',component:EditInstituteComponent,canActivate:[AuthGuard]},
  {path:'admin/deleteInstitute/:id',component:AdminacademyComponent,canActivate:[AuthGuard]},
  
  {path:'admin/viewCourse',component:ViewCourseComponent,canActivate:[AuthGuard]},
  {path:'admin/viewCourse/:id',component:ViewInstituteCourseComponent,canActivate:[AuthGuard]},
  {path:'admin/addCourse/:id',component:AddCourseComponent,canActivate:[AuthGuard]},
  {path:'admin/editCourse/:id',component:EditCourseComponent,canActivate:[AuthGuard]},
  {path:'admin/deleteCourse/:id',component:ViewCourseComponent,canActivate:[AuthGuard]},
  
  {path:'admin/viewStudent',component:ViewStudentComponent,canActivate:[AuthGuard]},
  {path:'admin/addStudent/:id',component:AddStudentComponent,canActivate:[AuthGuard]},
  {path:'admin/editStudent/:id',component:EditStudentComponent,canActivate:[AuthGuard]},
  {path:'admin/deleteStudent/:id',component:ViewStudentComponent,canActivate:[AuthGuard]},

  {path:'user/login',component:ViewacademyComponent,canActivate:[AuthGuard]},
  {path:'user/viewStatus/:id',component:ViewcoursesComponent,canActivate:[AuthGuard]},
  
  {path:'user/addAdmission/:id',component:AddAdmissionComponent,canActivate:[AuthGuard]},
  {path:'user/viewAdmission',component:EnrolledcourseComponent,canActivate:[AuthGuard]},
  {path:'user/editAdmission/:id',component:EditAdmissionComponent,canActivate:[AuthGuard]},
  {path:'user/deleteAdmission/:id',component:ViewcoursesComponent,canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
