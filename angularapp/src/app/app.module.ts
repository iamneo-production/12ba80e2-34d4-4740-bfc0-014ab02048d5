import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxUiLoaderModule, NgxUiLoaderHttpModule} from 'ngx-ui-loader';
import { ToastrModule, ToastNoAnimationModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminacademyComponent } from './components/admin/adminacademy/adminacademy.component';
import { EditInstituteComponent } from './components/admin/adminacademy/edit-institute/edit-institute.component';







@NgModule({
  declarations: [
    AppComponent,
    AdminacademyComponent,
    EditInstituteComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground:true,
    }),
    ToastrModule.forRoot(),
    ToastNoAnimationModule.forRoot(),
    NgbModule
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
