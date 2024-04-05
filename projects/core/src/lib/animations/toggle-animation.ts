import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const toggleAnimation = trigger('transformCheck', [
  state(
    'unchecked',
    style({
      transform: 'translateX(0)',
    }),
  ),
  transition(
    'unchecked => checked',
    animate(
      '150ms linear',
      style({
        transform: 'translateX(1.15rem)',
      }),
    ),
  ),
  state(
    'checked',
    style({
      transform: 'translateX(1.15rem)',
    }),
  ),
  transition(
    '* => unchecked',
    animate(
      '150ms linear',
      style({
        opacity: 0,
        transform: 'translateX(0)',
      }),
    ),
  ),
]);
