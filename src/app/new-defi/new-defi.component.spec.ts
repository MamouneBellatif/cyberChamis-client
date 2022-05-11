import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDefiComponent } from './new-defi.component';

describe('NewDefiComponent', () => {
  let component: NewDefiComponent;
  let fixture: ComponentFixture<NewDefiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewDefiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDefiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
