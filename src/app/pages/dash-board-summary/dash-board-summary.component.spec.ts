import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashBoardSummaryComponent } from './dash-board-summary.component';

describe('DashBoardSummaryComponent', () => {
  let component: DashBoardSummaryComponent;
  let fixture: ComponentFixture<DashBoardSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashBoardSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashBoardSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
