import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManpowerUsedPage } from './manpower-used.page';

describe('ManpowerUsedPage', () => {
  let component: ManpowerUsedPage;
  let fixture: ComponentFixture<ManpowerUsedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManpowerUsedPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManpowerUsedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
