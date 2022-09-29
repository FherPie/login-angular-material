import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprasDetailsComponent } from './compras-details.component';

describe('ComprasDetailsComponent', () => {
  let component: ComprasDetailsComponent;
  let fixture: ComponentFixture<ComprasDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComprasDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprasDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
