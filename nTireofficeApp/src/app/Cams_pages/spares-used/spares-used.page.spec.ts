import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { sparesUsedPage } from './spares-used.page';

describe('sparesUsedPage', () => {
  let component: sparesUsedPage;
  let fixture: ComponentFixture<sparesUsedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ sparesUsedPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(sparesUsedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
