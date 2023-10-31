import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleAddComponent } from './detalle-add.component';

describe('DetalleAddComponent', () => {
  let component: DetalleAddComponent;
  let fixture: ComponentFixture<DetalleAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
