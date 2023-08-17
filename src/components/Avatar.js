import React from "react";
import { styled } from "styled-components";

export const NavAvatar = ({userImage}) => {
  return <SCNavAvatar src={userImage}/>
};

export const PostAvatar = ({userImage}) => {
  return <SCPostAvatar src={userImage}/>
};

const SCNavAvatar = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 26.5px;

  @media (min-width: 625px) {
    width: 53px;
    height: 53px;
  };
`;

const SCPostAvatar = styled(SCNavAvatar)`
  width: 50px;
  height: 50px;
  position: absolute;
  top: 16px;
  left: 18px;

  @media (max-width: 625px) {
    display: none;
  };
`;

