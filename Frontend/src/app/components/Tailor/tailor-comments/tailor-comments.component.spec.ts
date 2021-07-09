import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TailorCommentsComponent } from './tailor-comments.component';

describe('TailorCommentsComponent', () => {
  let component: TailorCommentsComponent;
  let fixture: ComponentFixture<TailorCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TailorCommentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TailorCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
