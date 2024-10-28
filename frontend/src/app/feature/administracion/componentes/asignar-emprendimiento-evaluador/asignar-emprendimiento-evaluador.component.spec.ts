import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarEmprendimientoEvaluadorComponent } from './asignar-emprendimiento-evaluador.component';

describe('AsignarEmprendimientoEvaluadorComponent', () => {
  let component: AsignarEmprendimientoEvaluadorComponent;
  let fixture: ComponentFixture<AsignarEmprendimientoEvaluadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsignarEmprendimientoEvaluadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignarEmprendimientoEvaluadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
