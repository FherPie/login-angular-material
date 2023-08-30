import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaestroAddComponent } from './maestro-add.component';

describe('MaestroAddComponent', () => {
  let component: MaestroAddComponent;
  let fixture: ComponentFixture<MaestroAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaestroAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaestroAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
