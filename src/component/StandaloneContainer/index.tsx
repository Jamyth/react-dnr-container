import React from 'react';
import type { SafeReactChildren } from 'type/component';
import { getStyle } from './style';
import { Resizable } from '../Resizable';
import { EnumUtil } from 'jamyth-web-util';
import { DirectionEnum } from '../../type/DirectionEnum';
import { Draggable } from '../Draggable';

interface Props {
    children: SafeReactChildren;
    minWidth?: number;
    minHeight?: number;
    movable?: boolean;
    className?: string;
}

export const StandaloneContainer = React.memo(
    ({ className = '', children, movable = false, minHeight, minWidth }: Props) => {
        const [container, setContainer] = React.useState<HTMLDivElement | null>(null);
        const [style, setStyle] = React.useState<React.CSSProperties | undefined>(undefined);

        React.useEffect(() => {
            if (!style) {
                setStyle(getStyle(container, movable, minHeight, minWidth));
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps -- mimic component did mount
        }, [container]);

        return (
            <div ref={setContainer} style={style} className={className}>
                {movable && <Draggable container={container} />}
                {children}
                {EnumUtil.toArray(DirectionEnum).map((direction) => (
                    <Resizable
                        container={container}
                        direction={direction}
                        key={direction}
                        minHeight={minHeight}
                        minWidth={minWidth}
                    />
                ))}
            </div>
        );
    },
);
