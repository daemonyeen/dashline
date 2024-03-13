import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'dl-loader',
  standalone: true,
  template:
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg>',
  styles: `
    :host {
      display: inline-block;
    }

    svg {
      width: 1rem;
      height: 1rem;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      100% {
        transform: rotate(360deg);
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DlLoaderComponent {}
