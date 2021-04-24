import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateMembershipComponent } from './create-update-membership.component';

describe('CreateUpdateMembershipComponent', () => {
  let component: CreateUpdateMembershipComponent;
  let fixture: ComponentFixture<CreateUpdateMembershipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUpdateMembershipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateMembershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
