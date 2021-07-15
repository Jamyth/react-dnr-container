import React from 'react';

export function useDraggable(container: HTMLDivElement | null) {
    const [grabbing, setGrabbing] = React.useState(false);
    const [initialX, setInitialX] = React.useState<number | null>(null);
    const [initialY, setInitialY] = React.useState<number | null>(null);

    const onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!container || !Array.from(e.currentTarget.classList).includes('draggable-bar')) {
            return;
        }
        document.body.style.userSelect = 'none';
        setInitialX(e.clientX - container.offsetLeft);
        setInitialY(e.clientY - container.offsetTop);
        setGrabbing(true);
    };
    const onMouseUp = () => {
        document.body.style.userSelect = 'auto';
        setInitialX(null);
        setInitialY(null);
        setGrabbing(false);
    };
    const onMouseMove = React.useCallback(
        (e: MouseEvent) => {
            if (!container || !grabbing || !initialX || !initialY) {
                return;
            }
            const { width, height } = container.getBoundingClientRect();
            const top = e.clientY - initialY + 'px';
            const left = e.clientX - initialX + 'px';
            const right = window.innerWidth - e.clientX - (width - initialX) + 'px';
            const bottom = window.innerHeight - e.clientY - (height - initialY) + 'px';
            /* eslint-disable @typescript-eslint/no-non-null-assertion -- request animation frame */
            const callback = () => {
                container.style.top = top;
                container.style.left = left;

                container.style.right = right;
                container.style.bottom = bottom;
            };
            /* eslint-enable @typescript-eslint/no-non-null-assertion */
            requestAnimationFrame(callback);
        },
        [container, grabbing, initialX, initialY],
    );

    React.useEffect(() => {
        document.addEventListener('mouseup', onMouseUp);
        return () => {
            document.removeEventListener('mouseup', onMouseUp);
        };
    }, []);

    React.useEffect(() => {
        if (!grabbing) {
            return;
        }
        document.addEventListener('mousemove', onMouseMove);

        return () => {
            document.removeEventListener('mousemove', onMouseMove);
        };
    }, [grabbing, onMouseMove]);

    return { grabbing, onMouseDown, onMouseUp };
}
