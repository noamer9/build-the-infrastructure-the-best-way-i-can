import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunitysPage } from './communitys.page';

describe('CommunitysPage', () => {
  let component: CommunitysPage;
  let fixture: ComponentFixture<CommunitysPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunitysPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunitysPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
