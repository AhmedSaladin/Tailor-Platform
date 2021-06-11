import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TailorAboutComponent } from './tailor-about.component';

describe('TailorAboutComponent', () => {
  let component: TailorAboutComponent;
  let fixture: ComponentFixture<TailorAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TailorAboutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TailorAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
