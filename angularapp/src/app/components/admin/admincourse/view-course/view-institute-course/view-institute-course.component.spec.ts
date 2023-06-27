import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInstituteCourseComponent } from './view-institute-course.component';

describe('ViewInstituteCourseComponent', () => {
  let component: ViewInstituteCourseComponent;
  let fixture: ComponentFixture<ViewInstituteCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewInstituteCourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewInstituteCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
