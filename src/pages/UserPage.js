import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { NavAvatar } from '../components/Avatar.js';
import { Header } from '../components/Header.js';
import { Timeline } from '../components/Timeline.js';
import useSession from '../hooks/useSession.js';
import { followService } from '../services/apiUser.js';
import { server } from '../services/utils.js';
import { PageH1, center } from '../style/utils';

export function UserPage() {
  const { id } = useParams();
  const { session } = useSession();
  const token = session === null ? undefined : session.token;
  const [user, setUser] = useState('');
  const [waitApi, setWaitApi] = useState(false);
  const [refresh, setRefresh] = useState([]);

  useEffect(() => {
    server
      .get(`/user/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(({ data }) => {
        setUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, token, refresh]);

  const followAction = () => {
    setWaitApi(true);

    followService(user.following, id, token)
      .then(res => {
        setWaitApi(false);
        setRefresh([...refresh]);
      })
      .catch(error => {
        setWaitApi(false);
        console.log(error.response)
        alert("Não foi possível concluir esta operação!")
      })
  };

  return (
    <UserContainer>
      <Header />
      <UserInfo>
        <div>
          <NavAvatar userImage={user.photo}/>
          <PageH1 data-test="user-title">{user.name}'s Posts</PageH1>
        </div>
        { 
          session.id !== Number(id) && user && 
          <FollowBtn
            data-test='follow-btn'
            following={String(user.following)}
            disabled={waitApi}
            onClick={followAction}
          >
            {user.following ? "Unfollow" : "Follow"}
          </FollowBtn> 
        }
      </UserInfo>
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

const FollowBtn = styled.button`
  width: 131px;
  height: 31px;
  font-family: Lato;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  border: none;
  border-radius: 5px;
  color: ${props => props.following === "true" ? "#1877F2" : "#fff"};
  background-color: ${props => props.following === "true" ? "#fff" : "#1877F2"};
  cursor: pointer;

  &:disabled {
    cursor: wait;
  }
`;

const UserInfo = styled.div`
  ${center}
  width: 80%;
  height: 50px;
  padding: 45px;
  display: flex;
  justify-content: space-between;

  div {
    display: flex;
    gap: 18px;
  };
`;