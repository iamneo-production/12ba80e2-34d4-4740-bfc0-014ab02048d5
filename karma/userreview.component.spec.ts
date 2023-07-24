import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserreviewComponent } from './userreview.component';

describe('UserreviewComponent', () => {
  let component: UserreviewComponent;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule], 
    providers: [UserreviewComponent]
  }));
  beforeEach(() => {
    const fixture = TestBed.createComponent(UserreviewComponent);
    component = fixture.componentInstance;
  });
  it('FE_userReviewTest', () => {
    expect(component).toBeTruthy();
  });
});