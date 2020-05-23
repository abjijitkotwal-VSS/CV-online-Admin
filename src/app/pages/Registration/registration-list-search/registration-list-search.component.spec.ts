import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationListSearchComponent } from './registration-list-search.component';

describe('RegistrationListSearchComponent', () => {
  let component: RegistrationListSearchComponent;
  let fixture: ComponentFixture<RegistrationListSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationListSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationListSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
