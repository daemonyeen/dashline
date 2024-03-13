import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const checkAnimation = trigger('transformCheck', [
  state(
    'unchecked',
    style({
      opacity: 0,
      transform: 'scale3d(0, 0, 0)',
    }),
  ),
  transition(
    'unchecked => checked',
    animate(
      '150ms linear',
      style({
        opacity: 1,
        transform: 'scale3d(1, 1, 1) translateY(0)',
      }),
    ),
  ),
  state(
    'checked',
    style({
      opacity: 1,
      transform: 'scale3d(1, 1, 1)',
    }),
  ),
  transition(
    '* => unchecked',
    animate(
      '150ms 25ms linear',
      style({
        opacity: 0,
        transform: 'scale3d(0, 0, 0)',
      }),
    ),
  ),
]);
