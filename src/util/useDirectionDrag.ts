import React from 'react';
import { DirectionEnum } from '../type/DirectionEnum';

export function useDirectionDrag(
    container: HTMLDivElement | null,
    direction: DirectionEnum,
    minWidth?: number,
    minHeight?: number,
) {
    const [isMouseDown, setIsMouseDown] = React.useState(false);

    const onMouseUp = () => {
        document.body.style.userSelect = 'auto';
        setIsMouseDown(false);
    };

    const onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!container || !Array.from(e.currentTarget.classList).includes('directional-dragger')) {
            return;
        }
        document.body.style.userSelect = 'none';
        setIsMouseDown(true);
    };

    const shouldPreventHorizontalResize = React.useCallback(
        (width: number) => {
            if (!minWidth) {
                return false;
            }
            return width <= minWidth;
        },
        [minWidth],
    );

    const shouldPreventVerticalResize = React.useCallback(
        (height: number) => {
            if (!minHeight) {
                return false;
            }
            return height <= minHeight;
        },
        [minHeight],
    );

    const handleDirectionalResize = React.useCallback(
        (
            e: MouseEvent,
            direction: DirectionEnum.TOP | DirectionEnum.LEFT | DirectionEnum.RIGHT | DirectionEnum.BOTTOM,
        ) => {
            if (!container) {
                return () => {};
            }
            const position = container.getBoundingClientRect();
            switch (direction) {
                case DirectionEnum.RIGHT:
                    return () => {
                        const right = window.innerWidth - e.clientX;
                        const width = window.innerWidth - position.left - right;
                        if (shouldPreventHorizontalResize(width)) {
                            return;
                        }
                        container.style.right = right + 'px';
                    };
                case DirectionEnum.LEFT:
                    return () => {
                        const width = window.innerWidth - e.clientX - (window.innerWidth - position.right);
                        if (shouldPreventHorizontalResize(width)) {
                            return;
                        }
                        container.style.left = e.clientX + 'px';
                    };
                case DirectionEnum.TOP:
                    return () => {
                        const height = window.innerHeight - e.clientY - (window.innerHeight - position.bottom);
                        console.info(height);
                        if (shouldPreventVerticalResize(height)) {
                            return;
                        }
                        container.style.top = e.clientY + 'px';
                    };
                case DirectionEnum.BOTTOM:
                    return () => {
                        const bottom = window.innerHeight - e.clientY;
                        const height = window.innerHeight - bottom - position.top;
                        if (shouldPreventVerticalResize(height)) {
                            return;
                        }
                        container.style.bottom = window.innerHeight - e.clientY + 'px';
                    };
            }
        },
        [container, shouldPreventHorizontalResize, shouldPreventVerticalResize],
    );

    const handleDiagonalResize = React.useCallback(
        (
            e: MouseEvent,
            direction:
                | DirectionEnum.TOP_LEFT
                | DirectionEnum.TOP_LEFT
                | DirectionEnum.TOP_RIGHT
                | DirectionEnum.BOTTOM_LEFT
                | DirectionEnum.BOTTOM_RIGHT,
        ) => {
            switch (direction) {
                case DirectionEnum.TOP_LEFT:
                    return () => {
                        handleDirectionalResize(e, DirectionEnum.TOP)();
                        handleDirectionalResize(e, DirectionEnum.LEFT)();
                    };
                case DirectionEnum.TOP_RIGHT:
                    return () => {
                        handleDirectionalResize(e, DirectionEnum.TOP)();
                        handleDirectionalResize(e, DirectionEnum.RIGHT)();
                    };
                case DirectionEnum.BOTTOM_LEFT:
                    return () => {
                        handleDirectionalResize(e, DirectionEnum.BOTTOM)();
                        handleDirectionalResize(e, DirectionEnum.LEFT)();
                    };
                case DirectionEnum.BOTTOM_RIGHT:
                    return () => {
                        handleDirectionalResize(e, DirectionEnum.BOTTOM)();
                        handleDirectionalResize(e, DirectionEnum.RIGHT)();
                    };
            }
        },
        [handleDirectionalResize],
    );

    const onMouseMove = React.useCallback(
        (e: MouseEvent) => {
            if (!isMouseDown || !container) {
                return;
            }
            let callback: () => void;
            switch (direction) {
                case DirectionEnum.TOP:
                case DirectionEnum.LEFT:
                case DirectionEnum.RIGHT:
                case DirectionEnum.BOTTOM:
                    callback = handleDirectionalResize(e, direction);
                    break;
                case DirectionEnum.TOP_LEFT:
                case DirectionEnum.TOP_RIGHT:
                case DirectionEnum.BOTTOM_LEFT:
                case DirectionEnum.BOTTOM_RIGHT:
                    callback = handleDiagonalResize(e, direction);
                    break;
            }
            requestAnimationFrame(callback);
        },
        [container, direction, handleDiagonalResize, handleDirectionalResize, isMouseDown],
    );

    React.useEffect(() => {
        document.addEventListener('mouseup', onMouseUp);
        return () => {
            document.removeEventListener('mouseup', onMouseUp);
        };
    }, []);

    React.useEffect(() => {
        document.addEventListener('mousemove', onMouseMove);

        return () => {
            document.removeEventListener('mousemove', onMouseMove);
        };
    }, [isMouseDown, onMouseMove]);

    return {
        onMouseUp,
        onMouseDown,
    };
}
