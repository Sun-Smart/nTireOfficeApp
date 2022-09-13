import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentWiseModelPage } from './department-wise-model.page';

describe('DepartmentWiseModelPage', () => {
  let component: DepartmentWiseModelPage;
  let fixture: ComponentFixture<DepartmentWiseModelPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentWiseModelPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentWiseModelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
