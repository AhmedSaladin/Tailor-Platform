import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutTailorComponent } from './about-tailor.component';

describe('AboutTailorComponent', () => {
  let component: AboutTailorComponent;
  let fixture: ComponentFixture<AboutTailorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutTailorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutTailorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
