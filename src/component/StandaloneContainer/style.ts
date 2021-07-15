import type React from 'react';

export function getStyle(
    container: HTMLDivElement | null,
    movable: boolean,
    minHeight?: number,
    minWidth?: number,
): React.CSSProperties {
    const _minHeight = minHeight ? minHeight + 'px' : undefined;
    const _minWidth = minWidth ? minWidth + 'px' : undefined;

    const paddingTop = movable ? '25px' : '15px';
    if (container) {
        const { width, height } = container.getBoundingClientRect();
        const windowTopHalf = window.innerHeight / 2;
        const windowLeftHalf = window.innerWidth / 2;
        const right = window.innerWidth - windowLeftHalf - width + 'px';
        const bottom = window.innerHeight - windowTopHalf - height + 'px';
        return {
            position: 'fixed',
            padding: '15px',
            top: windowTopHalf + 'px',
            left: windowLeftHalf + 'px',
            right,
            bottom,
            paddingTop,
            minHeight: _minHeight,
            minWidth: _minWidth,
        };
    }
    return {
        position: 'fixed',
        padding: '15px',
        paddingTop,
        minHeight: _minHeight,
        minWidth: _minWidth,
    };
}
