import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutmainComponent } from './checkoutmain.component';

describe('CheckoutmainComponent', () => {
  let component: CheckoutmainComponent;
  let fixture: ComponentFixture<CheckoutmainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutmainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutmainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
