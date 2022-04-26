import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListChamisComponent } from './list-chamis.component';

describe('ListChamisComponent', () => {
  let component: ListChamisComponent;
  let fixture: ComponentFixture<ListChamisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListChamisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListChamisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
