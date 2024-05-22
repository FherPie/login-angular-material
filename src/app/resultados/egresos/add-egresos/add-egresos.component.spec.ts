import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEgresosComponent } from './add-egresos.component';

describe('AddEgresosComponent', () => {
  let component: AddEgresosComponent;
  let fixture: ComponentFixture<AddEgresosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEgresosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEgresosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
