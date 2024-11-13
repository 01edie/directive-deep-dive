import {
  Directive,
  effect,
  inject,
  input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Permission } from './auth.model';
import { AuthService } from './auth.service';

@Directive({
  selector: '[appAuth]',
  standalone: true,
})
export class AuthDirective {
  userRole = input.required<Permission>({ alias: 'appAuth' });
  private templateRef = inject(TemplateRef);
  private viewContainerRef = inject(ViewContainerRef);

  constructor(private authService: AuthService) {
    console.log('auth structural directive');
    effect(() => {
      console.log('auth structural directive effect');
      const currentRole = authService.activePermission();
      if (currentRole === this.userRole()) {
        console.log('SHOW EL');
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
        console.log('remove el');
        this.viewContainerRef.clear();
      }
    });
  }
}
