import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HashtagPage } from './pages/HashtagPage.js';
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SignInPage />}></Route>
                <Route path="/sign-up" element={<SignUpPage />}></Route>
                <Route path="/hashtag/:hashtag" element={<HashtagPage />} />
            </Routes>
        </BrowserRouter>
    )
}
