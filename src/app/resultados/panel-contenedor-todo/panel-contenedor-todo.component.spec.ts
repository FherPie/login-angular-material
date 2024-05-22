import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelContenedorTodoComponent } from './panel-contenedor-todo.component';

describe('PanelContenedorTodoComponent', () => {
  let component: PanelContenedorTodoComponent;
  let fixture: ComponentFixture<PanelContenedorTodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelContenedorTodoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelContenedorTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
