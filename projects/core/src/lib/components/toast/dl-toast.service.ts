import {
  ComponentType,
  Overlay,
  OverlayConfig,
  OverlayRef,
} from '@angular/cdk/overlay';
import {
  ComponentRef,
  EmbeddedViewRef,
  inject,
  Injectable,
  InjectionToken,
  Injector,
  OnDestroy,
  TemplateRef,
} from '@angular/core';
import { ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { DlToastRef } from './toast-ref';
import { DL_TOAST_DATA, DlToastConfig } from './toast-config';
import { ToastComponent, TextOnlySnackBar } from './dl-toast.component';
import { DlToastContainer } from './toast-container.component';

export const DL_TOAST_DEFAULT_CONFIG = new InjectionToken<DlToastConfig>(
  'dl-toast-default-config',
  {
    providedIn: 'root',
    factory: () => new DlToastConfig(),
  },
);

@Injectable({ providedIn: 'root' })
export class DlToastService implements OnDestroy {
  // --- @deps ---
  private readonly _overlay = inject(Overlay);
  private readonly _injector = inject(Injector);
  private readonly _parentSnackBar = inject(DlToastService, {
    optional: true,
    skipSelf: true,
  });

  // --- @private ---
  private _defaultConfig = inject<DlToastConfig>(DL_TOAST_DEFAULT_CONFIG);
  private _toastRefAtThisLevel: DlToastRef<any> | null = null;

  // --- @public ---
  get openedToastRef(): DlToastRef<any> | null {
    const parent = this._parentSnackBar;

    return parent ? parent.openedToastRef : this._toastRefAtThisLevel;
  }

  set openedToastRef(value: DlToastRef<any> | null) {
    if (this._parentSnackBar) {
      this._parentSnackBar.openedToastRef = value;
    } else {
      this._toastRefAtThisLevel = value;
    }
  }

  openFromComponent<T, D = any>(
    component: ComponentType<T>,
    config?: DlToastConfig<D>,
  ): DlToastRef<T> {
    return this._attach(component, config) as DlToastRef<T>;
  }

  openFromTemplate(
    template: TemplateRef<any>,
    config?: DlToastConfig,
  ): DlToastRef<EmbeddedViewRef<any>> {
    return this._attach(template, config);
  }

  open(
    message: string,
    action: string = '',
    config?: DlToastConfig,
  ): DlToastRef<TextOnlySnackBar> {
    config = { ...this._defaultConfig, ...config };
    config.data = { message, action };

    return this.openFromComponent(ToastComponent, config);
  }

  dismiss() {
    if (this.openedToastRef) {
      this.openedToastRef.dismiss();
    }
  }

  ngOnDestroy() {
    if (this._toastRefAtThisLevel) {
      this._toastRefAtThisLevel.dismiss();
    }
  }

  private _attachSnackBarContainer(
    overlayRef: OverlayRef,
    config: DlToastConfig,
  ): DlToastContainer {
    const userInjector =
      config && config.viewContainerRef && config.viewContainerRef.injector;
    const injector = Injector.create({
      parent: userInjector || this._injector,
      providers: [{ provide: DlToastConfig, useValue: config }],
    });

    const containerPortal = new ComponentPortal(
      DlToastContainer,
      config.viewContainerRef,
      injector,
    );
    const containerRef: ComponentRef<DlToastContainer> =
      overlayRef.attach(containerPortal);

    containerRef.instance.config = config;

    return containerRef.instance;
  }

  private _attach<T>(
    content: ComponentType<T> | TemplateRef<T>,
    userConfig?: DlToastConfig,
  ): DlToastRef<T | EmbeddedViewRef<any>> {
    const config = {
      ...this._defaultConfig,
      ...userConfig,
    };

    const overlayRef = this._createOverlay(config);
    const container = this._attachSnackBarContainer(overlayRef, config);
    const toastRef = new DlToastRef<T | EmbeddedViewRef<any>>(
      container,
      overlayRef,
    );

    if (content instanceof TemplateRef) {
      const portal = new TemplatePortal(content, null!, {
        $implicit: config.data,
        toastRef,
      } as any);

      toastRef.instance = container.attachTemplatePortal(portal);
    } else {
      const injector = this._createInjector(config, toastRef);
      const portal = new ComponentPortal(content, undefined, injector);
      const contentRef = container.attachComponentPortal<T>(portal);

      // We can't pass this via the injector, because the injector is created earlier.
      toastRef.instance = contentRef.instance;
    }

    this._animateSnackBar(toastRef, config);
    this.openedToastRef = toastRef;

    return this.openedToastRef;
  }

  private _animateSnackBar(toastRef: DlToastRef<any>, config: DlToastConfig) {
    toastRef.afterDismissed().subscribe(() => {
      if (this.openedToastRef == toastRef) {
        this.openedToastRef = null;
      }
    });

    if (this.openedToastRef) {
      this.openedToastRef.afterDismissed().subscribe(() => {
        toastRef.containerInstance.enter();
      });
      this.openedToastRef.dismiss();
    } else {
      toastRef.containerInstance.enter();
    }

    // If a dismiss timeout is provided, set up dismiss based on after the snackbar is opened.
    if (config.duration && config.duration > 0) {
      toastRef
        .afterOpened()
        .subscribe(() => toastRef._dismissAfter(config.duration!));
    }
  }

  private _createOverlay(config: DlToastConfig): OverlayRef {
    const overlayConfig = new OverlayConfig();
    const positionStrategy = this._overlay.position().global();
    const isLeft = config.horizontalPosition === 'left';
    const isRight = !isLeft && config.horizontalPosition !== 'center';

    if (isLeft) {
      positionStrategy.left('0');
    } else if (isRight) {
      positionStrategy.right('0');
    } else {
      positionStrategy.centerHorizontally();
    }

    if (config.verticalPosition === 'top') {
      positionStrategy.top('0');
    } else {
      positionStrategy.bottom('0');
    }

    overlayConfig.positionStrategy = positionStrategy;

    return this._overlay.create(overlayConfig);
  }

  private _createInjector<T>(
    config: DlToastConfig,
    toastRef: DlToastRef<T>,
  ): Injector {
    const userInjector =
      config && config.viewContainerRef && config.viewContainerRef.injector;

    return Injector.create({
      parent: userInjector || this._injector,
      providers: [
        { provide: DlToastRef, useValue: toastRef },
        { provide: DL_TOAST_DATA, useValue: config.data },
      ],
    });
  }
}
