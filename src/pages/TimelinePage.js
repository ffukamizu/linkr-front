import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import CreatePost from '../components/CreatePost.js';
import { Header } from '../components/Header.js';
import { Post } from '../components/Post.jsx';
import { server } from '../services/utils.js';
import { H1, center } from '../style/utils';

export function TimelinePage() {
  const [posts, setPosts] = useState('Loading');
  useEffect(() => {
    // In the future, this will require a token.
    // , {headers: { Authorization: `Bearer ${user?.token}` }}
    server
      .get(`/posts`, {})
      .then(({ data }) => {
        console.log([...posts, ...data]);
        setPosts(data);
        // if (data.length === 0) alert("There are no posts yet");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <TimelineContainer>
      <Header />
      <H1 fs="33px">timeline</H1>
      <CreatePost />
      {posts === 'Loading' && posts}
      {(Array.isArray(posts) && posts.length === 0) && 'There are no posts yet'}
      {posts === null && 'An error occured while trying to fetch the posts, please refresh the page'}
      <ul>{Array.isArray(posts) && posts.map((p) => <Post key={p.id} user={p.user} text={p.text} link={p.link} />)}</ul>
    </TimelineContainer>
  );
}

const TimelineContainer = styled.div`
  ${center}
  justify-content: flex-start;
  flex-direction: column;
  background-color: #333333;
  height: 100svh;
  > h1 {
    height: 49px;
    align-self: flex-start;
    margin: 19px 17px;
  }
  > ul {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 16px 0px;
  }
`;
