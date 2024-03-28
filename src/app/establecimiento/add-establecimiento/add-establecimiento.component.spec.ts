import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEstablecimientoComponent } from './add-establecimiento.component';

describe('AddEstablecimientoComponent', () => {
  let component: AddEstablecimientoComponent;
  let fixture: ComponentFixture<AddEstablecimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEstablecimientoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEstablecimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
