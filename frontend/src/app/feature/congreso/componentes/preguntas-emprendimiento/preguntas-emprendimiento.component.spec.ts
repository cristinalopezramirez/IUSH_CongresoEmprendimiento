import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreguntasEmprendimientoComponent } from './preguntas-emprendimiento.component';

describe('PreguntasEmprendimientoComponent', () => {
  let component: PreguntasEmprendimientoComponent;
  let fixture: ComponentFixture<PreguntasEmprendimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreguntasEmprendimientoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreguntasEmprendimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
