import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserhomepageComponent } from './userhomepage.component';

describe('UserhomepageComponent', () => {
  let component: UserhomepageComponent;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule], 
    providers: [UserhomepageComponent]
  }));
  beforeEach(() => {
    const fixture = TestBed.createComponent(UserhomepageComponent);
    component = fixture.componentInstance;
  });
  it('FE_userHomePageTest', () => {
    expect(component).toBeTruthy();
  });
});