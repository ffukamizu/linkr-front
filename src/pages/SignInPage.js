import React from "react";
import { styled } from "styled-components";
import Logo from "../components/Logo";
import StyledLink from "../style/StyledLink";
import StyledLoginInput from "../style/StyledLoginInput";
import StyledLoginButton from "../style/StyledLoginButton";
export default function SignInPage(){
    return (
        <SCPageContentBox>
            <Logo/>
            <SCStyledForm>
                <StyledLoginInput placeholder="e-mail"></StyledLoginInput>
                <StyledLoginInput placeholder="password"></StyledLoginInput>
                <StyledLoginButton>Log In</StyledLoginButton>
                <StyledLink to={"/sign-up"}>First time? Create an account!</StyledLink>
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
    margin-top:317px;
    align-items: center;
    gap:15px;
`;