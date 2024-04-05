import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'alert',
    loadComponent: () =>
      import('./pages/alert-page/alert-page.component').then(
        m => m.AlertPageComponent,
      ),
  },
  {
    path: 'badge',
    loadComponent: () =>
      import('./pages/badge-page/badge-page.component').then(
        m => m.BadgePageComponent,
      ),
  },
  {
    path: 'button',
    loadComponent: () =>
      import('./pages/button-page/button-page.component').then(
        m => m.ButtonPageComponent,
      ),
  },
  {
    path: 'menu',
    loadComponent: () =>
      import('./pages/menu-page/menu-page.component').then(
        m => m.MenuPageComponent,
      ),
  },
  {
    path: 'input',
    loadComponent: () =>
      import('./pages/input-page/input-page.component').then(
        m => m.InputPageComponent,
      ),
  },
  {
    path: 'textarea',
    loadComponent: () =>
      import('./pages/textarea-page/textarea-page.component').then(
        m => m.TextareaPageComponent,
      ),
  },
  {
    path: 'checkbox',
    loadComponent: () =>
      import('./pages/checkbox-page/checkbox-page.component').then(
        m => m.CheckboxPageComponent,
      ),
  },
  {
    path: 'toggle',
    loadComponent: () =>
      import('./pages/toggle-page/toggle-page.component').then(
        m => m.TogglePageComponent,
      ),
  },
  {
    path: 'select',
    loadComponent: () =>
      import('./pages/select-page/select-page.component').then(
        m => m.SelectPageComponent,
      ),
  },
  {
    path: 'autocomplete',
    loadComponent: () =>
      import('./pages/autocomplete-page/autocomplete-page.component').then(
        m => m.AutocompletePageComponent,
      ),
  },
  {
    path: 'calendar',
    loadComponent: () =>
      import('./pages/calendar-page/calendar-page.component').then(
        m => m.CalendarPageComponent,
      ),
  },
  {
    path: 'table',
    loadComponent: () =>
      import('./pages/table-page/table-page.component').then(
        m => m.TablePageComponent,
      ),
  },
  {
    path: 'dialog',
    loadComponent: () =>
      import('./pages/dialog-page/dialog-page.component').then(
        m => m.DialogPageComponent,
      ),
  },
  {
    path: 'alert-dialog',
    loadComponent: () =>
      import('./pages/alert-dialog-page/alert-dialog-page.component').then(
        m => m.AlertDialogPageComponent,
      ),
  },
  {
    path: 'tabs',
    loadComponent: () =>
      import('./pages/tabs-page/tabs-page.component').then(
        m => m.TabsPageComponent,
      ),
  },
  {
    path: 'switch',
    loadComponent: () =>
      import('./pages/switch-page/switch-page.component').then(
        m => m.SwitchPageComponent,
      ),
  },
  {
    path: 'popover',
    loadComponent: () =>
      import('./pages/popover-page/popover-page.component').then(
        m => m.PopoverPageComponent,
      ),
  },
  {
    path: 'tooltip',
    loadComponent: () =>
      import('./pages/tooltip-page/tooltip-page.component').then(
        m => m.TooltipPageComponent,
      ),
  },
  {
    path: 'toast',
    loadComponent: () =>
      import('./pages/toast-page/toast-page.component').then(
        m => m.ToastPageComponent,
      ),
  },
];
