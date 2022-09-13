import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetReconcilPage } from './asset-reconcil.page';

describe('AssetReconcilPage', () => {
  let component: AssetReconcilPage;
  let fixture: ComponentFixture<AssetReconcilPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetReconcilPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetReconcilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
