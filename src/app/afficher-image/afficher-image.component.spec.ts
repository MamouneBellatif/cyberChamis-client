import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherImageComponent } from './afficher-image.component';

describe('AfficherImageComponent', () => {
  let component: AfficherImageComponent;
  let fixture: ComponentFixture<AfficherImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficherImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfficherImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
