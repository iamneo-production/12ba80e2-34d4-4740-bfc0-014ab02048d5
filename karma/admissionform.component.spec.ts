import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AdmissionformComponent } from './admissionform.component';

describe('AdmissionformComponent', () => {
  let component: AdmissionformComponent;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule], 
    providers: [AdmissionformComponent]
  }));
  beforeEach(() => {
    const fixture = TestBed.createComponent(AdmissionformComponent);
    component = fixture.componentInstance;
  });
  it('FE_admissionFormTest', () => {
    expect(component).toBeTruthy();
  });
});