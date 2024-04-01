import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEstablismentComponent } from './add-establecimiento.component';


describe('AddEstablecimientoComponent', () => {
  let component: AddEstablismentComponent;
  let fixture: ComponentFixture<AddEstablismentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEstablismentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEstablismentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
