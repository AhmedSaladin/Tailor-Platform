import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TailorRequestsComponent } from './tailor-requests.component';

describe('TailorRequestsComponent', () => {
  let component: TailorRequestsComponent;
  let fixture: ComponentFixture<TailorRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TailorRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TailorRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
