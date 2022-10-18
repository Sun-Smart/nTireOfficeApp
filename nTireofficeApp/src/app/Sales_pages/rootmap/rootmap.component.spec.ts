/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RootmapComponent } from './rootmap.component';

describe('RootmapComponent', () => {
  let component: RootmapComponent;
  let fixture: ComponentFixture<RootmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RootmapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RootmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
