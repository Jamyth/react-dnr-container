import React from 'react';
import { StandaloneContainer } from 'standalone-container/component/StandaloneContainer';

export const Main = React.memo(() => {
    return (
        <StandaloneContainer>
            <h1>Hello World</h1>
        </StandaloneContainer>
    );
});
