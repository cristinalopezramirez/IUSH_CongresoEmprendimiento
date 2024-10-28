import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioEmprendedorComponent } from './inicio-emprendedor.component';

describe('InicioEmprendedorComponent', () => {
  let component: InicioEmprendedorComponent;
  let fixture: ComponentFixture<InicioEmprendedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InicioEmprendedorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InicioEmprendedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
