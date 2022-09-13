import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetTransferPage } from './asset-transfer.page';

describe('AssetTransferPage', () => {
  let component: AssetTransferPage;
  let fixture: ComponentFixture<AssetTransferPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetTransferPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetTransferPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
