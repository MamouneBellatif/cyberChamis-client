import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdDelDefiComponent } from './upd-del-defi.component';

describe('UpdDelDefiComponent', () => {
  let component: UpdDelDefiComponent;
  let fixture: ComponentFixture<UpdDelDefiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdDelDefiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdDelDefiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
