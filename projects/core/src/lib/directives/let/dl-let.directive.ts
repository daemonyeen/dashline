import {
  Directive,
  Inject,
  Input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { DlLetContext } from './let-context';

/**
 * Works like *ngIf but does not have a condition — use it to declare
 * the result of pipes calculation (i.e. async pipe)
 */
@Directive({
  selector: '[dlLet]',
  standalone: true,
})
export class DlLetDirective<T> {
  @Input()
  dlLet!: T;

  constructor(
    @Inject(ViewContainerRef) viewContainer: ViewContainerRef,
    @Inject(TemplateRef) templateRef: TemplateRef<DlLetContext<T>>,
  ) {
    viewContainer.createEmbeddedView(templateRef, new DlLetContext<T>(this));
  }

  /**
   * Asserts the correct type of the context for the template that `Let` will render.
   *
   * The presence of this method is a signal to the Ivy template type-check compiler that the
   * `Let` structural directive renders its template with a specific context type.
   */
  // eslint-disable-next-line no-unused-vars
  static ngTemplateContextGuard<T>(
    _dir: DlLetDirective<T>,
    _ctx: any,
  ): _ctx is DlLetDirective<T> {
    return true;
  }
}
