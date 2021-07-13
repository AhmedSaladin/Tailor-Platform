import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TailorsDashboardComponent } from './tailors-dashboard.component';

describe('TailorsDashboardComponent', () => {
  let component: TailorsDashboardComponent;
  let fixture: ComponentFixture<TailorsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TailorsDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TailorsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
