import { Directive, HostListener } from "@angular/core";

@Directive({
    selector: '[solo-numeros]',
})
export class SoloNumerosDirective {
    constructor() { }

    @HostListener('input', ['$event'])
    inputEvent(event: KeyboardEvent) {
        const input = event.target as HTMLInputElement;
        input.value = input.value.replace(/[^\d]+/g, '');
    }
}