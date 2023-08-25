import React, { useState } from 'react';
import { styled } from 'styled-components';
import CreatePost from '../components/CreatePost.js';
import { Header } from '../components/Header.js';
import { Timeline } from '../components/Timeline.js';
import { Trending } from '../components/Trending.js';
import { PageH1, center } from '../style/utils';
import { IncomingPost } from '../components/IncomingPost.js';

export function TimelinePage() {
  const [updating, setUpdating] = useState([]);

  return (
    <TimelineContainer>
      <Header />
      <Main>
        <div>
          <PageH1>timeline</PageH1>
          <CreatePost updating={updating} setUpdating={setUpdating}/>
          <IncomingPost/>
          <Timeline from="/posts" trending={false} updating={updating} setUpdating={setUpdating}/>
        </div>
        <aside>
          <Trending />
        </aside>
      </Main>
    </TimelineContainer>
  );
}

const TimelineContainer = styled.div`
  ${center}
  justify-content: flex-start;
  flex-direction: column;
  background-color: #333333;
  height: 100svh;
`;

const Main = styled.div`
  display: flex;
  gap: 25px;
  margin-top: 72px;
  > div {
    ${center}
    flex-direction: column;
    gap: 16px;
    > h1 {
      height: 49px;
      align-self: flex-start;
      margin: 19px 17px 2px;
    }
  }
  @media (max-width: 1000px) {
    gap: 0px;
    > aside {
      display: none;
    }
  }
  @media (max-width: 625px) {
    width: 100%;
    >div {
      width: 100%;
    }
  }
`;
