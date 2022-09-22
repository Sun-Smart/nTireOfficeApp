import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddtravelexpensedetailsPage } from './addtravelexpensedetails.page';

describe('AddtravelexpensedetailsPage', () => {
  let component: AddtravelexpensedetailsPage;
  let fixture: ComponentFixture<AddtravelexpensedetailsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddtravelexpensedetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddtravelexpensedetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
