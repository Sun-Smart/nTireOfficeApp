import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VendorpendingQuotationsPage } from './vendorpending-quotations.page';

describe('VendorpendingQuotationsPage', () => {
  let component: VendorpendingQuotationsPage;
  let fixture: ComponentFixture<VendorpendingQuotationsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorpendingQuotationsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VendorpendingQuotationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
