import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { Header } from '../components/Header.js';
import { Timeline } from '../components/Timeline.js';
import useSession from '../hooks/useSession.js';
import { server } from '../services/utils.js';
import { PageH1, center } from '../style/utils';

export function UserPage() {
  const { id } = useParams();
  const { session } = useSession();
  const token = session === null ? undefined : session.token;
  const [name, setName] = useState('');

  useEffect(() => {
    server
      .get(`/user/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(({ data }) => {
        setName(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  return (
    <UserContainer>
      <Header />
      <PageH1 data-test="user-title">{name}'s Posts</PageH1>
      <Timeline from={`/posts/user/${id}`} updating={[id]} />
    </UserContainer>
  );
}

const UserContainer = styled.div`
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
