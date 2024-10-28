import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEmprendimientosPitchComponent } from './lista-emprendimientos-pitch.component';

describe('ListaEmprendimientosPitchComponent', () => {
  let component: ListaEmprendimientosPitchComponent;
  let fixture: ComponentFixture<ListaEmprendimientosPitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaEmprendimientosPitchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaEmprendimientosPitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
