import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroEvaluadorComponent } from './registro-evaluador.component';

describe('RegistroEvaluadorComponent', () => {
  let component: RegistroEvaluadorComponent;
  let fixture: ComponentFixture<RegistroEvaluadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroEvaluadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroEvaluadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
