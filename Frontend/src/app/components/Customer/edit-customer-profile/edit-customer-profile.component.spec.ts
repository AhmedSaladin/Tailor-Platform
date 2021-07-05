import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCustomerProfileComponent } from './edit-customer-profile.component';

describe('EditCustomerProfileComponent', () => {
  let component: EditCustomerProfileComponent;
  let fixture: ComponentFixture<EditCustomerProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCustomerProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCustomerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
