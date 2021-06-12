import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TailorSingleRequestComponent } from './tailor-single-request.component';

describe('TailorSingleRequestComponent', () => {
  let component: TailorSingleRequestComponent;
  let fixture: ComponentFixture<TailorSingleRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TailorSingleRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TailorSingleRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
