import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import useSession from '../hooks/useSession.js';
import { server } from '../services/utils.js';
import { LogH2, center } from '../style/utils.js';
import { Post } from './Post.js';
import { Trending } from './Trending.js';

export function Timeline({ from, trending = true, updating = [] }) {
  const [posts, setPosts] = useState('Loading');
  const { session } = useSession();
  const token = session === null ? undefined: session.token;
  useEffect(() => {
    server
      .get(from, { headers: { Authorization: `Bearer ${token}` } })
      .then(({ data }) => {
        setPosts(data);
      })
      .catch((err) => {
        setPosts(null);
        console.log(err);
      });
    setPosts('Loading');
  }, [...updating]);

  return (
    <TimelineContainer>
      <main>
        {posts === 'Loading' && <LogH2 data-test="message">Loading</LogH2>}
        {Array.isArray(posts) && posts.length === 0 && <LogH2 data-test="message">There are no posts yet</LogH2>}
        {posts === null && (
          <LogH2 data-test="message">An error occured while trying to fetch the posts, please refresh the page</LogH2>
        )}
        {Array.isArray(posts) && (
          <ul>
            {posts.map((p) => (
              <Post key={p.id} user={p.user} text={p.text} likes={p.likes} link={p.link} />
            ))}
          </ul>
        )}
      </main>
      {trending && <Trending />}
    </TimelineContainer>
  );
}

const TimelineContainer = styled.div`
  ${center}
  gap: 25px;
  align-items: flex-start;
  width: 100%;

  main {
    width: 100%;
    > ul {
      width: 100%;
      ${center}
      flex-direction: column;
      gap: 16px;
    }
  }
  @media (min-width: 833px) {
    padding: 0px 16px;
    main {
      width: 100%;
      max-width: 611px;
      text-align: center;
    }
  }
`;
