import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import useSession from '../hooks/useSession';
import { NavAvatar } from './Avatar';
import { Search } from './Search';

export function Header() {
    const { session, signOut } = useSession();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <HeaderContainer>
            <div>
                <Link to="/timeline">
                    <StyledLogo>Linkr</StyledLogo>
                </Link>
                <Search />
                <UserContainer
                    onClick={toggleDropdown}
                    data-test="avatar">
                    <MenuArrow>
                        <ion-icon name={dropdownOpen ? 'chevron-up-outline' : 'chevron-down-outline'}></ion-icon>
                    </MenuArrow>
                    {session.photo && (
                        <UserProfile>
                            <NavAvatar userImage={session.photo} />
                        </UserProfile>
                    )}
                    {dropdownOpen && (
                        <DropdownMenu>
                            <LogoutButton
                                as={Link}
                                to="/"
                                onClick={signOut}>
                                Logout
                            </LogoutButton>
                        </DropdownMenu>
                    )}
                </UserContainer>
            </div>
        </HeaderContainer>
    );
}

const HeaderContainer = styled.header`
    height: 72px;

    > div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: fixed;
        z-index: 100;
        left: 0px;
        width: 100%;
        height: 72px;
        flex-shrink: 0;
        background: #151515;
        box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
        padding-inline: 30px;
    }

    a {
        text-decoration: none;
    }
`;

const StyledLogo = styled.h1`
    color: #fff;
    font-family: Passion One;
    font-size: 49px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 2.45px;
`;

const UserContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const MenuArrow = styled.div`
    stroke-width: 3px;
    color: white;
    font-size: 30px;
    padding-inline: 8px;
    margin-top: 8px;
`;

const UserProfile = styled.div`
    width: 53px;
    height: 53px;
    flex-shrink: 0;
    border-radius: 26.5px;
    background: lightgray -3.07px -0.143px / 109.434% 100.538% no-repeat;
`;

const DropdownMenu = styled.div`
    width: 150px;
    height: 47px;
    flex-shrink: 0;
    position: absolute;
    top: 100%;
    right: 0;
    background: #151515;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 0 0 0 10px;
    padding: 10px;
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LogoutButton = styled.button`
    background-color: transparent;
    border: none;
    background: #151515;
    color: #fff;
    font-family: Lato;
    font-size: 17px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.85px;
    cursor: pointer;
`;
