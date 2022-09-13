import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationWiseAssetPage } from './location-wise-asset.page';

describe('LocationWiseAssetPage', () => {
  let component: LocationWiseAssetPage;
  let fixture: ComponentFixture<LocationWiseAssetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationWiseAssetPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationWiseAssetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
