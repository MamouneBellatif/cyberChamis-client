import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDefiComponent } from './edit-defi.component';

describe('EditDefiComponent', () => {
  let component: EditDefiComponent;
  let fixture: ComponentFixture<EditDefiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDefiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDefiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
