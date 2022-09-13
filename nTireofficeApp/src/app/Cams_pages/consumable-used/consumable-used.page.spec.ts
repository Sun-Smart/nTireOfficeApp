import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumableUsedPage } from './consumable-used.page';

describe('ConsumableUsedPage', () => {
  let component: ConsumableUsedPage;
  let fixture: ComponentFixture<ConsumableUsedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumableUsedPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumableUsedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
