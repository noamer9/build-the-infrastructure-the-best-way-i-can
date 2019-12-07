import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MokedSrugimPage } from './moked-srugim.page';

describe('MokedSrugimPage', () => {
  let component: MokedSrugimPage;
  let fixture: ComponentFixture<MokedSrugimPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MokedSrugimPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MokedSrugimPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
