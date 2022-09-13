import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ApplicanteditemployeedetailsPage } from './applicanteditemployeedetails.page';

describe('ApplicanteditemployeedetailsPage', () => {
  let component: ApplicanteditemployeedetailsPage;
  let fixture: ComponentFixture<ApplicanteditemployeedetailsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicanteditemployeedetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ApplicanteditemployeedetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
