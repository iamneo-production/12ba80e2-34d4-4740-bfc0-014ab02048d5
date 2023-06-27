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
import { AuthGuard } from './gaurds/auth.guard';

const routes: Routes = [
  {path:'', redirectTo:'login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
