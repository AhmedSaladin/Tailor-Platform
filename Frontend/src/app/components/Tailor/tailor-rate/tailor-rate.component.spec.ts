import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TailorRateComponent } from './tailor-rate.component';

describe('TailorRateComponent', () => {
  let component: TailorRateComponent;
  let fixture: ComponentFixture<TailorRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TailorRateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TailorRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
