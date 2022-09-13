import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpareUsedUpdatePage } from './spare-used-update.page';

describe('SpareUsedUpdatePage', () => {
  let component: SpareUsedUpdatePage;
  let fixture: ComponentFixture<SpareUsedUpdatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpareUsedUpdatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpareUsedUpdatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
