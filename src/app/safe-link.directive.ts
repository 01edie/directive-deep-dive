import { Directive, ElementRef, inject, input } from '@angular/core';
import { LogDirective } from './log.directive';

@Directive({
  selector: 'a[safeLinkDirective]',
  standalone: true,
  host: {
    '(click)': 'onLeaveSite($event)',
  },
  hostDirectives: [LogDirective],
})
export class SafeLinkDirective {
  queryParam = input('myValue', { alias: 'safeLinkDirective' }); // {alias:'safeLinkDirective'}

  private hostElementRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef);
  constructor() {
    console.log('Safe Link directory is active');
  }
  onLeaveSite(event: MouseEvent) {
    const wantsTo = window.confirm('Are you willing to leave the site?');

    if (wantsTo) {
      const address =
        // (event.target as HTMLAnchorElement).href + '?from=' + this.queryParam();
        this.hostElementRef.nativeElement.href + '?from=' + this.queryParam();
      this.hostElementRef.nativeElement.href = address;
    }
    if (!wantsTo) {
      event.preventDefault();
    }
  }
}
