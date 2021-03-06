import { Directive, HostBinding, HostListener, Input } from "@angular/core";


@Directive({
  selector: '[appDropDown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;
  @HostListener('click') toggleOpen(){
    this.isOpen = !this.isOpen;
  }
}
