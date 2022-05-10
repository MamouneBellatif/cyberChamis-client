import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDefiComponent } from './update-defi.component';

describe('UpdateDefiComponent', () => {
  let component: UpdateDefiComponent;
  let fixture: ComponentFixture<UpdateDefiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateDefiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDefiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
