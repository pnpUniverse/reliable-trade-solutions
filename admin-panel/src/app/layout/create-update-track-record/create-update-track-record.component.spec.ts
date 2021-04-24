import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateTrackRecordComponent } from './create-update-track-record.component';

describe('CreateUpdateTrackRecordComponent', () => {
  let component: CreateUpdateTrackRecordComponent;
  let fixture: ComponentFixture<CreateUpdateTrackRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUpdateTrackRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateTrackRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
