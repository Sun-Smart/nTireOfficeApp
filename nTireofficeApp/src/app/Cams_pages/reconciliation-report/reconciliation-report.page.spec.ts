import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReconciliationReportPage } from './reconciliation-report.page';

describe('ReconciliationReportPage', () => {
  let component: ReconciliationReportPage;
  let fixture: ComponentFixture<ReconciliationReportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReconciliationReportPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReconciliationReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
