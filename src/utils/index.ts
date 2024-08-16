import { cva } from 'class-variance-authority';

export const stateVariants = cva('bi', {
  variants: {
    state: {
      0: 'bi-check-circle-fill text-success',
      1: 'bi-x-circle-fill text-danger',
      2: 'bi-clock-fill text-warning',
      3: 'bi-dash-circle-fill text-info',
    },
  },
  defaultVariants: {
    state: 1,
  },
});
