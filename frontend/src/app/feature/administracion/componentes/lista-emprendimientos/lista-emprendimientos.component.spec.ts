import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEmprendimientosComponent } from './lista-emprendimientos.component';

describe('ListaEmprendimientosComponent', () => {
  let component: ListaEmprendimientosComponent;
  let fixture: ComponentFixture<ListaEmprendimientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaEmprendimientosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaEmprendimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
