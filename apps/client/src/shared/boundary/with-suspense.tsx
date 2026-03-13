import { Suspense } from 'react';
import type { ComponentType, ReactElement } from 'react';

export const withSuspense = <T extends object>(
  Component: ComponentType<T>,
  SuspenseComponent: ReactElement
) =>
  function WithSuspense(props: T) {
    return (
      <Suspense fallback={SuspenseComponent}>
        <Component {...props} />
      </Suspense>
    );
  };
