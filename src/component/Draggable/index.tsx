import React from 'react';
import { getStyle } from './style';
import { useDraggable } from '../../util/useDraggable';

interface Props {
    container: HTMLDivElement | null;
}

export const Draggable = React.memo(({ container }: Props) => {
    const { grabbing, ...handlers } = useDraggable(container);
    return <div className="draggable-bar" style={getStyle(grabbing)} {...handlers} />;
});
