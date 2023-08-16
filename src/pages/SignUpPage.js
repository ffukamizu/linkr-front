import React from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
export default function SigUpPage(){
    return (
        <SCPageContentBox>
            <SCLogoBox></SCLogoBox>


            <Link to={"/"}>Login</Link>
        </SCPageContentBox>
    )
}

const SCPageContentBox = styled.div`
    display:flex;
    width:100%;
    height:100%;
`;

const SCLogoBox = styled.div`
    width:62%;
    height:100%;
    background-color:#151515;
`;