import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingJobsPage } from './pending-jobs.page';

describe('PendingJobsPage', () => {
  let component: PendingJobsPage;
  let fixture: ComponentFixture<PendingJobsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingJobsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingJobsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
