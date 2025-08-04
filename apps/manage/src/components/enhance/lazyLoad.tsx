import React, { lazy, Suspense } from 'react';
import ComponentLoading from './ComponentLoading';

export function lazyLoad(importFn: () => Promise<{ default: React.ComponentType<any> }>) {
  const LazyComponent = lazy(importFn);
  return function load(props: any) {
    return (
      <Suspense fallback={<ComponentLoading />}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}
