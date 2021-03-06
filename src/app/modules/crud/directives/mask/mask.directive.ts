import { Directive, HostListener, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { masks } from 'src/app/modules/common/consts';
import { maskFormat } from 'src/app/modules/common/utils/mask.utils';

@Directive({
  selector: '[appMask]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: MaskDirective,
    multi: true
  }]
})
export class MaskDirective implements ControlValueAccessor {

  @Input() appMask: string;

  private onTouched: any;
  private BACK_SPACE = 8;
  private onChange = (value: any) => { };

  writeValue(value: any): void { this.onChange(value); }
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }

  private transform = ($event, value) => {
    $event.target.value = value;
    this.writeValue(value);
  }

  private handleBackSpace($event) {
    let newValue = $event.target.value;

    if (this.appMask.toUpperCase() === 'PHONE') {
      const length = $event.target.value.length;
      if (length > 14) { newValue = maskFormat($event.target.value, masks.PHONE); }

    }

    this.transform($event, newValue);
  }

  private handleNonBackSpace($event) {
    let $mask = masks[this.appMask.toUpperCase()];

    if (this.appMask.toUpperCase() === 'PHONE') {
      const length = $event.target.value.length;
      if (length > 14) { $mask = masks.PHONE_D; }
    }

    const newValue = maskFormat($event.target.value, $mask);
    this.transform($event, newValue);

  }

  @HostListener('keyup', ['$event'])
  onKeyup($event: any) {
    const method = $event.keyCode !== this.BACK_SPACE ? 'handleNonBackSpace' : 'handleBackSpace';
    this[method]($event);
  }

  @HostListener('blur', ['$event'])
  onBlur($event: any) {
    if ($event.target.value.length > masks[this.appMask.toUpperCase()].length) {
      const newValue = $event.target.value.slice(0, masks[this.appMask.toUpperCase()].length);
      this.transform($event, newValue);
    }
  }
}
