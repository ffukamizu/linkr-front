import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { styled } from 'styled-components';
import { HashtagPage } from './pages/HashtagPage';

export default function App() {
    return (
        <ContentContainer>
            <BrowserRouter>
                <Routes>
                    <Route path="/hashtag/:hashtag" element={<HashtagPage />} />
                </Routes>
            </BrowserRouter>
        </ContentContainer>
    );
}

const ContentContainer = styled.div``;
