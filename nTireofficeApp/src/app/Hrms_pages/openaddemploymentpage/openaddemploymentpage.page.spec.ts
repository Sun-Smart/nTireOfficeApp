import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OpenaddemploymentpagePage } from './openaddemploymentpage.page';

describe('OpenaddemploymentpagePage', () => {
  let component: OpenaddemploymentpagePage;
  let fixture: ComponentFixture<OpenaddemploymentpagePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenaddemploymentpagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OpenaddemploymentpagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
