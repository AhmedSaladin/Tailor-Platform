import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTailorProfileComponent } from './edit-tailor-profile.component';

describe('EditTailorProfileComponent', () => {
  let component: EditTailorProfileComponent;
  let fixture: ComponentFixture<EditTailorProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTailorProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTailorProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
