import type React from 'react';

export type SafeReactChild = React.ReactChild | undefined | boolean;
export type SafeReactChildren = SafeReactChild | SafeReactChild[];
