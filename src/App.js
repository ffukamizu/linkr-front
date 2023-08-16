import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SignInPage/>}></Route>
                <Route path="/sign-up" element={<SignUpPage/>}></Route>
            </Routes>

        </BrowserRouter>
    )
}
