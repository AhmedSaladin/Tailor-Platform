import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSingleRequestComponent } from './customer-single-request.component';

describe('CustomerSingleRequestComponent', () => {
  let component: CustomerSingleRequestComponent;
  let fixture: ComponentFixture<CustomerSingleRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerSingleRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerSingleRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
