import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentWisePage } from './department-wise.page';

describe('DepartmentWisePage', () => {
  let component: DepartmentWisePage;
  let fixture: ComponentFixture<DepartmentWisePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentWisePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentWisePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
