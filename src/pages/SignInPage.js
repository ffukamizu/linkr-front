import React, { useState } from 'react';
import { styled } from 'styled-components';
import Logo from '../components/Logo';
import StyledLink from '../style/StyledLink';
import StyledLoginInput from '../style/StyledLoginInput';
import StyledLoginButton from '../style/StyledLoginButton';
import { Link, useNavigate } from 'react-router-dom';
import useSession from '../hooks/useSession';
import apiAuth from '../services/apiAuth';

export default function SignInPage() {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const { signIn } = useSession();
    const navigate = useNavigate();

    function userSignIn(e) {
        e.preventDefault();

        const user = {
            email: email,
            password: password,
        };

        function loginSuccess(session) {
            signIn(session);
            navigate('/timeline');
        }

        function loginFailure() {
            setEmail('');
            setPassword('');
        }

        apiAuth.signIn(user, loginSuccess, loginFailure);
    }

    return (
        <SCPageContentBox>
            <Logo />
            <SCStyledForm onSubmit={userSignIn}>
                <StyledLoginInput
                    required
                    placeholder="e-mail"
                    type="text"
                    onChange={(e) => setEmail(e.target.value)}></StyledLoginInput>
                <StyledLoginInput
                    required
                    placeholder="password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}></StyledLoginInput>
                <StyledLoginButton>Log In</StyledLoginButton>
                <StyledLink
                    as={Link}
                    to={'/sign-up'}>
                    First time? Create an account!
                </StyledLink>
            </SCStyledForm>
        </SCPageContentBox>
    );
}

const SCPageContentBox = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
`;

const SCStyledForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 38%;
    margin-top: 317px;
    align-items: center;
    gap: 15px;
`;
