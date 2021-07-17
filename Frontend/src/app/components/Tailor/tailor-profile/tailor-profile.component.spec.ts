import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TailorProfileComponent } from './tailor-profile.component';

describe('TailorProfileComponent', () => {
  let component: TailorProfileComponent;
  let fixture: ComponentFixture<TailorProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TailorProfileComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TailorProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
