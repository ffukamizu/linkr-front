import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { server } from '../services/utils.js';
import useSession from '../hooks/useSession.js';

export function IncomingPost() {
    const { session } = useSession();
    const [counter, setCounter] = useState(0);
    const token = session === null ? undefined : session.token;
    const [previousCount, setPreviousCount] = useState(0);

    useEffect(() => {
        const fetchPostsAndUpdateCounter = () => {
            server
                .get('/posts', { headers: { Authorization: `Bearer ${token}` } })
                .then((response) => {
                    const currentCount = response.data.length;
                    if (currentCount !== previousCount) {
                        setCounter(currentCount - previousCount);
                        setPreviousCount(currentCount);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        };

        fetchPostsAndUpdateCounter();

        const intervalId = setInterval(fetchPostsAndUpdateCounter, 15000);

        return () => {
            clearInterval(intervalId);
        };
    }, [token, previousCount]);

    const handleContainerClick = () => {
        if (counter > 0) {
            window.location.reload();
        }
    };

    return (
        <IncomingPostContainer
            onClick={handleContainerClick}
            shouldHide={counter === 0}>
            <h2>{counter} new posts, load more!</h2>
            <div>
                <ion-icon name="reload-outline"></ion-icon>
            </div>
        </IncomingPostContainer>
    );
}

const IncomingPostContainer = styled.div`
    width: 611px;
    height: 61px;
    border-radius: 16px;
    background: #1877f2;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    display: ${(props) => (props.shouldHide ? 'none' : 'flex')};
    justify-content: center;
    align-items: center;
    cursor: ${(props) => (props.shouldHide ? 'default' : 'pointer')};

    h2 {
        color: #fff;
        font-family: Lato;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }

    div {
        font-size: 16px;
        color: #fff;
        margin-left: 16px;
    }
`;
