import React from 'react';
import { styled } from 'styled-components';

export function Header() {
  return <HeaderContainer></HeaderContainer>;
}

const HeaderContainer = styled.header`
  width: 100%;
  height: 72px;
  flex-shrink: 0;
  background: #151515;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;
