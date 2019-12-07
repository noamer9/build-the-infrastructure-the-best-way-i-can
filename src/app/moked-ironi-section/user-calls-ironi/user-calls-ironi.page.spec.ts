import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCallsIroniPage } from './user-calls-ironi.page';

describe('UserCallsIroniPage', () => {
  let component: UserCallsIroniPage;
  let fixture: ComponentFixture<UserCallsIroniPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCallsIroniPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCallsIroniPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
