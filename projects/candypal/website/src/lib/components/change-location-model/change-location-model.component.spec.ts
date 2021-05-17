import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ChangeLocationModelComponent } from './change-location-model.component';

describe('ChangeLocationModelComponent', () => {
  let component: ChangeLocationModelComponent;
  let fixture: ComponentFixture<ChangeLocationModelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeLocationModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeLocationModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
