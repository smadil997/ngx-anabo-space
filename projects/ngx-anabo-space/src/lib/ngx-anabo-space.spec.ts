import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxAnaboSpace } from './ngx-anabo-space';

describe('NgxAnaboSpace', () => {
  let component: NgxAnaboSpace;
  let fixture: ComponentFixture<NgxAnaboSpace>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxAnaboSpace]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxAnaboSpace);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
