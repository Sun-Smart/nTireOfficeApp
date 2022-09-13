import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletionJobsPage } from './completion-jobs.page';

describe('CompletionJobsPage', () => {
  let component: CompletionJobsPage;
  let fixture: ComponentFixture<CompletionJobsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletionJobsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletionJobsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
