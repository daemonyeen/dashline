import { DlLetDirective } from './dl-let.directive';

export interface DlContextWithImplicit<T> {
  $implicit: T;
}

export class DlLetContext<T> implements DlContextWithImplicit<T> {
  constructor(private readonly internalDirectiveInstance: DlLetDirective<T>) {}

  get $implicit(): T {
    return this.internalDirectiveInstance.dlLet;
  }

  get dlLet(): T {
    return this.internalDirectiveInstance.dlLet;
  }
}
