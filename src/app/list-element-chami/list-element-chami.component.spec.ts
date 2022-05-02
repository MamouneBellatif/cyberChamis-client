import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListElementChamiComponent } from './list-element-chami.component';

describe('ListElementChamiComponent', () => {
  let component: ListElementChamiComponent;
  let fixture: ComponentFixture<ListElementChamiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListElementChamiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListElementChamiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
