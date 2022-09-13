import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ApplicationeditskillsdetailsPage } from './applicationeditskillsdetails.page';

describe('ApplicationeditskillsdetailsPage', () => {
  let component: ApplicationeditskillsdetailsPage;
  let fixture: ComponentFixture<ApplicationeditskillsdetailsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationeditskillsdetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ApplicationeditskillsdetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
