import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaestroListComponent } from './maestro-list.component';

describe('MaestroListComponent', () => {
  let component: MaestroListComponent;
  let fixture: ComponentFixture<MaestroListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaestroListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaestroListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
