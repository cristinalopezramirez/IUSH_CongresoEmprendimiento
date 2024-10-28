import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadosEvaluacionPitchComponent } from './resultados-evaluacion-pitch.component';

describe('ResultadosEvaluacionPitchComponent', () => {
  let component: ResultadosEvaluacionPitchComponent;
  let fixture: ComponentFixture<ResultadosEvaluacionPitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultadosEvaluacionPitchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultadosEvaluacionPitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
