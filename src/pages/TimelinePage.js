import React from 'react';
import { styled } from 'styled-components';
import CreatePost from '../components/CreatePost.js';
import { Header } from '../components/Header.js';
import { Timeline } from '../components/Timeline.js';
import { PageH1, center } from '../style/utils';

export function TimelinePage() {
  return (
    <TimelineContainer>
      <Header />
      <PageH1>timeline</PageH1>
      <CreatePost />
      <Timeline from="/posts" />
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
