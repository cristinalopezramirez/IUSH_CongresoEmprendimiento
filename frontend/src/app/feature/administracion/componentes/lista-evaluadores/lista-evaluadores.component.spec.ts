import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEvaluadoresComponent } from './lista-evaluadores.component';

describe('ListaEvaluadoresComponent', () => {
  let component: ListaEvaluadoresComponent;
  let fixture: ComponentFixture<ListaEvaluadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaEvaluadoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaEvaluadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
