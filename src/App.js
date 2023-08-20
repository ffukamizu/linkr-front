import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/SessionContext.js';
import { HashtagPage } from './pages/HashtagPage.js';
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import { TimelinePage } from './pages/TimelinePage.js';
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/hashtag/:hashtag" element={<HashtagPage />} />
        </Routes>
      </BrowserRouter>
      </AuthProvider>
  );
}
