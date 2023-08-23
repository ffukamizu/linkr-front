import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import useSession from '../hooks/useSession.js';
import { server } from '../services/utils.js';

export function Trending({ updating = [] }) {
    const [hashtags, setHashtags] = useState([]);
    const { session } = useSession();
    const token = session === null ? undefined : session.token;
    useEffect(() => {
        server
            .get('/posts/trending', { headers: { Authorization: `Bearer ${token}` } })
            .then(({ data }) => {
                setHashtags(data);
            })
            .catch((err) => {
                console.log(err);
            });
        // eslint-disable-next-line
    }, [...updating, token]);

    return (
        <TrendingContainer data-test="trending">
            <div>
                <h2>trending</h2>
                <ul>
                    {hashtags.map((h) => (
                        <li key={h.tag}>
                            <Link
                                data-test="hashtag"
                                to={`/hashtag/${h.tag.slice(1)}`}
                                state={h.tag}>
                                {h.tag}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </TrendingContainer>
    );
}

const TrendingContainer = styled.div`
    width: 301px;
    height: 406px;

    div {
        position: fixed;
        top: 162px;
        z-index: 10;
        flex-shrink: 0;
        background-color: #171717;
        color: #fff;
        width: 301px;
        height: 406px;
        border-radius: 16px;
        padding: 9px 16px;
        h2 {
            font-family: 'Oswald', sans-serif;
            font-size: 27px;
            font-weight: 700;
            line-height: 50px;
            letter-spacing: 0em;
            text-align: left;
            border-bottom: 1px solid #484848;
            height: 60px;
            margin-bottom: 10px;
        }
        li {
            font-size: 19px;
            font-weight: 700;
            line-height: 23px;
            letter-spacing: 0.05em;
            text-align: left;
            a {
                text-decoration: none;
                cursor: pointer;
                color: #ffffff;
            }
        }
    }
    @media (max-width: 833px) {
        display: none;
    }
`;
