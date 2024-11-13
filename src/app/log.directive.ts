import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[appLog]',
  standalone: true,
  host: {
    '(click)': 'onLog()',
  },
})
export class LogDirective {
  private elRef = inject(ElementRef);

  onLog() {
    console.log(this.elRef.nativeElement);
  }
}
