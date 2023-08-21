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
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);
    const { signIn } = useSession();
    const navigate = useNavigate();

    function userSignIn(e) {
        e.preventDefault();

        setIsDisabled(true);

        const user = {
            email: email,
            password: password,
        };

        function loginSuccess(session) {
            signIn(session);
            navigate('/timeline');
            setIsDisabled(false);
        }

        function loginFailure() {
            setEmail('');
            setPassword('');
            setIsDisabled(false);
        }

        apiAuth.signIn(user, loginSuccess, loginFailure);
    }

    return (
        <SCPageContentBox>
            <Logo />
            <SCStyledForm onSubmit={userSignIn}>
                <StyledLoginInput
                    data-test="email"
                    required
                    placeholder="e-mail"
                    type="text"
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isDisabled}
                    value={email}></StyledLoginInput>
                <StyledLoginInput
                    data-test="password"
                    required
                    placeholder="password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)} disabled={isDisabled}
                    value={password}></StyledLoginInput>
                <StyledLoginButton data-test="login-btn" disabled={isDisabled}>Log In</StyledLoginButton>
                <StyledLink
                    data-test="sign-up-Link"
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
