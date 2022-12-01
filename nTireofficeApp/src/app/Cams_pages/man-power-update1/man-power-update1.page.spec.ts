import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ManPowerUpdate1Page } from './man-power-update1.page';

describe('ManPowerUpdate1Page', () => {
  let component: ManPowerUpdate1Page;
  let fixture: ComponentFixture<ManPowerUpdate1Page>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ManPowerUpdate1Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ManPowerUpdate1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
