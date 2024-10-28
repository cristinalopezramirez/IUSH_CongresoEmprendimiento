import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroEmprendedorComponent } from './registro-emprendedor.component';

describe('RegistroEmprendedorComponent', () => {
  let component: RegistroEmprendedorComponent;
  let fixture: ComponentFixture<RegistroEmprendedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroEmprendedorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroEmprendedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
