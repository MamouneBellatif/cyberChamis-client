import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChamiComponent } from './chami.component';

describe('ChamiComponent', () => {
  let component: ChamiComponent;
  let fixture: ComponentFixture<ChamiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChamiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChamiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
