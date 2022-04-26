import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDefisComponent } from './list-defis.component';

describe('ListDefisComponent', () => {
  let component: ListDefisComponent;
  let fixture: ComponentFixture<ListDefisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDefisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDefisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
