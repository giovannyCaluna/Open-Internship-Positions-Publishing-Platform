import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListApplicantsModalComponent } from './list-applicants-modal.component';

describe('ListApplicantsModalComponent', () => {
  let component: ListApplicantsModalComponent;
  let fixture: ComponentFixture<ListApplicantsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListApplicantsModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListApplicantsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
