import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TailorsComponent } from './tailors.component';

describe('TailorsComponent', () => {
  let component: TailorsComponent;
  let fixture: ComponentFixture<TailorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TailorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TailorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
