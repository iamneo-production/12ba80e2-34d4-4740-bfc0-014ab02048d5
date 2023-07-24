import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminacademyComponent } from './components/admin/adminacademy/adminacademy.component';
import { EditInstituteComponent } from './components/admin/adminacademy/edit-institute/edit-institute.component';


const routes: Routes = [
  
  {path:'admin/viewInstitutes',component:AdminacademyComponent},
  {path:'admin/editInstitute/:id',component:EditInstituteComponent},
  {path:'admin/deleteInstitute/:id',component:AdminacademyComponent},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
