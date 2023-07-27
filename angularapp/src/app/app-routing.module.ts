import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminacademyComponent } from './components/admin/adminacademy/adminacademy.component';
import { UserNavbarComponent } from './components/user/user-navbar/user-navbar.component';
import { ViewacademyComponent } from './components/user/viewacademy/viewacademy.component';
import { AuthGuard } from './gaurds/auth.guard';

const routes: Routes = [
  {path:'user-navbar',component:UserNavbarComponent,canActivate:[AuthGuard]},
  {path:'admin/viewInstitutes',component:AdminacademyComponent,canActivate:[AuthGuard]},
  {path:'user/viewStatus/:id',component:ViewcoursesComponent,canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }