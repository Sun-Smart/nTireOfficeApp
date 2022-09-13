import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRequestPage } from './user-request.page';

describe('UserRequestPage', () => {
  let component: UserRequestPage;
  let fixture: ComponentFixture<UserRequestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRequestPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
