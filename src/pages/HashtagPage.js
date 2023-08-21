import React from 'react';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { Header } from '../components/Header.js';
import { Timeline } from '../components/Timeline.js';
import { PageH1, center } from '../style/utils';

export function HashtagPage() {
  const { hashtag } = useParams();
  return (
    <HashtagContainer>
      <Header />
      <PageH1># {hashtag}</PageH1>
      <Timeline from={`/posts/hashtag/${hashtag}`} updating={[hashtag]}/>
    </HashtagContainer>
  );
}

const HashtagContainer = styled.div`
  ${center}
  justify-content: flex-start;
  flex-direction: column;
  background-color: #333333;
  > h1 {
    height: 49px;
    align-self: flex-start;
    margin: 19px 17px;
  }
`;
