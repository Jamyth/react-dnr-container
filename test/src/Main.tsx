import React from 'react';
import { StandaloneContainer } from 'standalone-container/component/StandaloneContainer';
import './index.scss';

export const Main = React.memo(() => {
    return (
        <StandaloneContainer movable minWidth={100} minHeight={200} className="g-window">
            <h1>blahablah</h1>
        </StandaloneContainer>
    );
});
