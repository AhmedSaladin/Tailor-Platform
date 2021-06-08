import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TailorGallaryComponent } from './tailor-gallary.component';

describe('TailorGallaryComponent', () => {
  let component: TailorGallaryComponent;
  let fixture: ComponentFixture<TailorGallaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TailorGallaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TailorGallaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
