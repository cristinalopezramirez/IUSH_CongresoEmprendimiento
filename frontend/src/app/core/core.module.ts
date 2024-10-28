import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { NavbarComponent } from "./componentes/navbar/navbar.component";
import { FooterComponent } from "./componentes/footer/footer.component";

@NgModule({
    declarations: [NavbarComponent, FooterComponent],
    exports: [NavbarComponent, FooterComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CoreModule { } 