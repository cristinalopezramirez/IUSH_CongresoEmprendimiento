import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioAdministracionComponent } from './inicio-administracion.component';

describe('InicioAdministracionComponent', () => {
  let component: InicioAdministracionComponent;
  let fixture: ComponentFixture<InicioAdministracionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InicioAdministracionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InicioAdministracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
