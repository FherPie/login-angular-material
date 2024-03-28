import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEstablecimientoComponent } from './list-establecimiento.component';

describe('ListEstablecimientoComponent', () => {
  let component: ListEstablecimientoComponent;
  let fixture: ComponentFixture<ListEstablecimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListEstablecimientoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListEstablecimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
