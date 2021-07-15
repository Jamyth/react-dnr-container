import type React from 'react';
import { DirectionEnum } from '../../type/DirectionEnum';

export function getStyle(direction: DirectionEnum): React.CSSProperties {
    const positionStyles = getPositionStyle(direction);
    return {
        position: 'absolute',
        ...positionStyles,
    };
}

function pixelize(size: number): string {
    return `${size}px`;
}

function getPositionStyle(direction: DirectionEnum): React.CSSProperties {
    const size = 10;
    const halfSize = pixelize(size / 2);
    const sizePx = pixelize(size);

    const horizontalPadding: React.CSSProperties = {
        left: halfSize,
        right: halfSize,
    };
    const verticalPadding: React.CSSProperties = {
        top: halfSize,
        bottom: halfSize,
    };

    switch (direction) {
        case DirectionEnum.TOP:
            return {
                top: '-' + halfSize,
                height: sizePx,
                cursor: 'n-resize',
                ...horizontalPadding,
            };
        case DirectionEnum.BOTTOM:
            return {
                bottom: '-' + halfSize,
                height: sizePx,
                ...horizontalPadding,
                cursor: 's-resize',
            };
        case DirectionEnum.LEFT:
            return {
                left: '-' + halfSize,
                width: sizePx,
                ...verticalPadding,
                cursor: 'w-resize',
            };
        case DirectionEnum.RIGHT:
            return {
                right: '-' + halfSize,
                width: sizePx,
                ...verticalPadding,
                cursor: 'e-resize',
            };
        case DirectionEnum.TOP_LEFT:
            return {
                width: sizePx,
                height: sizePx,
                top: '-' + halfSize,
                left: '-' + halfSize,
                cursor: 'nw-resize',
            };
        case DirectionEnum.TOP_RIGHT:
            return {
                width: sizePx,
                height: sizePx,
                top: '-' + halfSize,
                right: '-' + halfSize,
                cursor: 'ne-resize',
            };
        case DirectionEnum.BOTTOM_LEFT:
            return {
                width: sizePx,
                height: sizePx,
                bottom: '-' + halfSize,
                left: '-' + halfSize,
                cursor: 'sw-resize',
            };
        case DirectionEnum.BOTTOM_RIGHT:
            return {
                width: sizePx,
                height: sizePx,
                bottom: '-' + halfSize,
                right: '-' + halfSize,
                cursor: 'se-resize',
            };
    }
}
