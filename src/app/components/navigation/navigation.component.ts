import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

type NavigationLink = Readonly<{
  name: string;
  link: string;
}>;

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
  readonly nav: NavigationLink[] = [
    {
      name: 'Button',
      link: '/button',
    },
    {
      name: 'Menu',
      link: '/menu',
    },
    {
      name: 'Input',
      link: '/input',
    },
    {
      name: 'Textarea',
      link: '/textarea',
    },
    {
      name: 'Checkbox',
      link: '/checkbox',
    },
    {
      name: 'Select',
      link: '/select',
    },
    {
      name: 'Autocomplete',
      link: '/autocomplete',
    },
    {
      name: 'Calendar',
      link: '/calendar',
    },
    {
      name: 'Table',
      link: '/table',
    },
    {
      name: 'Dialog',
      link: '/dialog',
    },
    {
      name: 'Alert dialog',
      link: '/alert-dialog',
    },
    {
      name: 'Tabs',
      link: '/tabs',
    },
    {
      name: 'Popover',
      link: '/popover',
    },
    {
      name: 'Tooltip',
      link: '/tooltip',
    },
    {
      name: 'Toast',
      link: '/toast',
    },
  ];
}
