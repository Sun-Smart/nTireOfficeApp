import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ApplicantioneditskillsdetailsPage } from './applicantioneditskillsdetails.page';

describe('ApplicantioneditskillsdetailsPage', () => {
  let component: ApplicantioneditskillsdetailsPage;
  let fixture: ComponentFixture<ApplicantioneditskillsdetailsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicantioneditskillsdetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ApplicantioneditskillsdetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
