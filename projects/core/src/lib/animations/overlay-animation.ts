import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const overlayAnimation = trigger('transformOverlay', [
  state(
    'void',
    style({
      opacity: 0,
      transform: 'scale3d(0.95, 0.95, 0.95) translateY(6px)',
    }),
  ),
  transition(
    'void => enter',
    animate(
      '150ms linear',
      style({
        opacity: 1,
        transform: 'scale3d(1, 1, 1) translateY(0)',
      }),
    ),
  ),
  transition(
    '* => void',
    animate(
      '150ms 25ms cubic-bezier(.4,0,.2,1)',
      style({
        opacity: 0,
        transform: 'scale3d(0.95, 0.95, 0.95) translateY(0)',
      }),
    ),
  ),
]);
