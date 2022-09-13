import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletionJobsReopenPage } from './completion-jobs-reopen.page';

describe('CompletionJobsReopenPage', () => {
  let component: CompletionJobsReopenPage;
  let fixture: ComponentFixture<CompletionJobsReopenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletionJobsReopenPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletionJobsReopenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
