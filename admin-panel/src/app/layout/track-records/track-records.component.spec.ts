import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackRecordsComponent } from './track-records.component';

describe('TrackRecordsComponent', () => {
  let component: TrackRecordsComponent;
  let fixture: ComponentFixture<TrackRecordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackRecordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
