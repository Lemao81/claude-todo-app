import 'react';

declare module 'react' {
  interface HTMLAttributes<T> {
    'data-cy'?: string;
  }
}
