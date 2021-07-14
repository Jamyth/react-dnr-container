import React from 'react';
import type { SafeReactChildren } from 'type/component';

interface Props {
    children: SafeReactChildren;
}

export const StandaloneContainer = React.memo(({ children }: Props) => {
    return <div>{children}</div>;
});
