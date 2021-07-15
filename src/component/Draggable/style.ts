import type React from 'react';

export function getStyle(grabbing: boolean): React.CSSProperties {
    if (grabbing) {
        document.body.style.cursor = 'grabbing';
    } else {
        document.body.style.cursor = 'initial';
    }
    return {
        position: 'absolute',
        top: '15px',
        width: '70%',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: '5rem',
        height: '5px',
        cursor: grabbing ? 'grabbing' : 'grab',
    };
}
