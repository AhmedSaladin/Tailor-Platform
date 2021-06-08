import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TailorInformationComponent } from './tailor-information.component';

describe('TailorInformationComponent', () => {
  let component: TailorInformationComponent;
  let fixture: ComponentFixture<TailorInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TailorInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TailorInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
