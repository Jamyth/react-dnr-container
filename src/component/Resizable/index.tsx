import React from 'react';
import type { DirectionEnum } from 'type/DirectionEnum';
import { getStyle } from './style';
import { useDirectionDrag } from '../../util/useDirectionDrag';

interface Props {
    container: HTMLDivElement | null;
    direction: DirectionEnum;
    minWidth?: number;
    minHeight?: number;
}

export const Resizable = React.memo(({ container, direction, minWidth, minHeight }: Props) => {
    const handlers = useDirectionDrag(container, direction, minWidth, minHeight);

    return <div className="directional-dragger" style={getStyle(direction)} {...handlers} />;
});
