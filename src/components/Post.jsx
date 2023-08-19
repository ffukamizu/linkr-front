import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiHeart } from 'react-icons/fi';
import { styled } from 'styled-components';
import { center } from '../style/utils';

export function Post({ user, likes, link }) {
    const navigate = useNavigate();

    return (
        <PostContainer>
            <LikesDiv>
                <img
                    src={user.photo}
                    alt="User"
                />
                <FiHeart
                    size="20px"
                    color="#ffffff"
                />
                <p>{likes} likes</p>
            </LikesDiv>
            <div>
                <h2>{user.name}</h2>
                <p></p>
                <LinkA href={link.url}>
                    <div>
                        <h3>{link.title}</h3>
                        <p>{link.description}</p>
                        <p>{link.url}</p>
                    </div>
                    <img
                        src={link.image}
                        alt="Link"
                    />
                </LinkA>
            </div>
        </PostContainer>
    );
}

const PostContainer = styled.div`
    ${center}
    gap: 14px;
    width: 375px;
    padding: 10px 18px 15px 15px;
    margin: 16px 0;
    background-color: #171717;
    h2 {
        color: #ffffff;
        font-size: 17px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        margin-bottom: 7px;
    }
    p {
        color: #b7b7b7;
        font-size: 15px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        margin-bottom: 13px;
        span {
        }
    }
`;

const LikesDiv = styled.div`
    ${center}
    align-self: flex-start;
    flex-direction: column;
    color: #ffffff;
    svg {
        width: 17px;
        height: 15px;
        margin: 17px 0px 12px;
    }
    img {
        width: 40px;
        height: 40px;
        background-color: blue;
        border-radius: 50%;
    }
    p {
        color: #ffffff;
        text-align: center;
        font-size: 9px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }
`;

const LinkA = styled.a`
    ${center}
    text-decoration: none;
    padding: 9px 0px 9px 11px;
    color: #ffffff;
    width: 288px;
    height: 115px;
    background-color: transparent;
    border: 1px solid #4d4d4d;
    border-radius: 12px;
    div {
        flex: 1;
        padding: 14px 0px 14px;
        max-width: 300px;
        h3 {
            color: #cecece;
            font-family: Lato;
            font-size: 11px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;

            max-width: 291px;
            margin-right: 43px;
        }
        p {
            color: #9b9595;
            font-size: 9px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            margin-right: 7px;
            margin-top: 4px;
        }
        p {
            color: #cecece;
            text-decoration: none;
            display: inline-block;
            font-family: Lato sans-serif;
            font-size: 9px;
            font-weight: 400;
            line-height: normal;
            margin-right: 43px;
            margin: 4px 43px 0px 0px;
            word-break: break-all;
        }
    }
    img {
        justify-self: flex-end;
        width: 95px;
        height: 115px;
        border-radius: 0px 11px 11px 0px;
        margin-right: -1px;
        border: none;
    }
`;
