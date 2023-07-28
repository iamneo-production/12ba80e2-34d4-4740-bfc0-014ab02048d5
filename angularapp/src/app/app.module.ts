import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule, ToastNoAnimationModule } from 'ngx-toastr';
import { AdminNavbarComponent } from './components/admin/admin-navbar/admin-navbar.component';
import { AdminacademyComponent } from './components/admin/adminacademy/adminacademy.component';
import { ViewacademyComponent } from './components/user/viewacademy/viewacademy.component';
import { EnrolledcourseComponent } from './components/user/enrolledcourse/enrolledcourse.component';
import { AddInstituteComponent } from './components/admin/adminacademy/add-institute/add-institute.component';
import { EditInstituteComponent } from './components/admin/adminacademy/edit-institute/edit-institute.component';
import { AddCourseComponent } from './components/admin/admincourse/add-course/add-course.component';
import { EditCourseComponent } from './components/admin/admincourse/edit-course/edit-course.component';
import { ViewCourseComponent } from './components/admin/admincourse/view-course/view-course.component';
import { ViewInstituteCourseComponent } from './components/admin/admincourse/view-course/view-institute-course/view-institute-course.component';
import { AddStudentComponent } from './components/admin/adminstudent/add-student/add-student.component';
import { EditStudentComponent } from './components/admin/adminstudent/edit-student/edit-student.component';
import { ViewStudentComponent } from './components/admin/adminstudent/view-student/view-student.component';
import { FilterPipe } from './pipes/filter.pipe';
import { NgxUiLoaderModule, NgxUiLoaderHttpModule} from 'ngx-ui-loader';
import { UserNavbarComponent } from './components/user/user-navbar/user-navbar.component';
import { UserFooterComponent } from './components/user/user-footer/user-footer.component';
import { ViewcoursesComponent } from './components/user/viewacademy/viewcourses/viewcourses.component';
import { AddAdmissionComponent } from './components/user/enrolledcourse/add-admission/add-admission.component';
import { EditAdmissionComponent } from './components/user/enrolledcourse/edit-admission/edit-admission.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    AdminNavbarComponent,
    AdminacademyComponent,
    ViewacademyComponent,
    EnrolledcourseComponent,
    AddInstituteComponent,
    EditInstituteComponent,
    AddCourseComponent,
    EditCourseComponent,
    ViewCourseComponent,
    ViewInstituteCourseComponent,
    AddStudentComponent,
    EditStudentComponent,
    ViewStudentComponent,
    FilterPipe,
    UserNavbarComponent,
    UserFooterComponent,
    ViewcoursesComponent,
    AddAdmissionComponent,
    EditAdmissionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    HttpClientModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground:true,
    }),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ToastNoAnimationModule.forRoot(),
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
