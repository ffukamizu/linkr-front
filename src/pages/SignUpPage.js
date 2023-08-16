import React from "react";
import { styled } from "styled-components";
import Logo from "../components/Logo";
import StyledLink from "../style/StyledLink";
import StyledLoginInput from "../style/StyledLoginInput";
import StyledLoginButton from "../style/StyledLoginButton";
export default function SigUpPage(){

    return (
        <SCPageContentBox>
            <Logo/>
            <SCStyledForm>
                <StyledLoginInput placeholder="e-mail"></StyledLoginInput>
                <StyledLoginInput placeholder="password"></StyledLoginInput>
                <StyledLoginInput placeholder="username"></StyledLoginInput>
                <StyledLoginInput placeholder="picture url"></StyledLoginInput>
                <StyledLoginButton>Sign Up</StyledLoginButton>
                <StyledLink to={"/"}>Switch back to log in</StyledLink>
            </SCStyledForm>
        </SCPageContentBox>
    )
}

const SCPageContentBox = styled.div`
    display:flex;
    width:100%;
    height:100%;
`;

const SCStyledForm = styled.form`
    display:flex;
    flex-direction:column;
    width:38%;
    margin-top:274px;
    align-items: center;
    gap:14px;

`;