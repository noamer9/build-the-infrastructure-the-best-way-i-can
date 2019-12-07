import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCallsSrugimPage } from './user-calls-srugim.page';

describe('UserCallsSrugimPage', () => {
  let component: UserCallsSrugimPage;
  let fixture: ComponentFixture<UserCallsSrugimPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCallsSrugimPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCallsSrugimPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
