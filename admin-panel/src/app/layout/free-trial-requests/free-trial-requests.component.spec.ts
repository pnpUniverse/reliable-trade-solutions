import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeTrialRequestsComponent } from './free-trial-requests.component';

describe('FreeTrialRequestsComponent', () => {
  let component: FreeTrialRequestsComponent;
  let fixture: ComponentFixture<FreeTrialRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreeTrialRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeTrialRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
