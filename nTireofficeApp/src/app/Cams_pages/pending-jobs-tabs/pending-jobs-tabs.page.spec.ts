import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingJobsTabsPage } from './pending-jobs-tabs.page';

describe('PendingJobsTabsPage', () => {
  let component: PendingJobsTabsPage;
  let fixture: ComponentFixture<PendingJobsTabsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingJobsTabsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingJobsTabsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
