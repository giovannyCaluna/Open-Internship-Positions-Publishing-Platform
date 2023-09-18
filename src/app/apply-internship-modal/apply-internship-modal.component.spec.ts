import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyInternshipModalComponent } from './apply-internship-modal.component';

describe('ApplyInternshipModalComponent', () => {
  let component: ApplyInternshipModalComponent;
  let fixture: ComponentFixture<ApplyInternshipModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplyInternshipModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplyInternshipModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
