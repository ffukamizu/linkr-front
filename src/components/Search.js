import React, { useEffect, useState } from 'react';
import { DebounceInput } from 'react-debounce-input';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import useSession from '../hooks/useSession.js';
import { server } from '../services/utils.js';
import { center } from '../style/utils.js';

export function Search() {
  const [value, setValue] = useState('');
  const [users, setUsers] = useState([]);
  const { session } = useSession();
  const token = session === null ? undefined : session.token;
  useEffect(() => {
    if (value.length >= 3) {
      server
        .post('/search/user', { name: value }, { headers: { Authorization: `Bearer ${token}` } })
        .then(({ data }) => {
          setUsers(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [value, token]);

  return (
    <InputContainer>
      <DebounceInput
        data-test="search"
        minLength={3}
        placeholder={'Search for people'}
        value={value}
        debounceTimeout={300}
        onChange={(e) => setValue(e.target.value)}
      />
      {value.length >= 3 && (
        <ListUsers>
          {users.map((u) => (
            <UserItem key={u.id} id={u.id} name={u.name} photo={u.photo} />
          ))}
        </ListUsers>
      )}
    </InputContainer>
  );
}

function UserItem({ id, name, photo }) {
  return (
    <Link to={`/user/${id}`} data-test='user-search'>
      <li>
        <img src={photo} alt={name} />
        <h2>{name}</h2>
      </li>
    </Link>
  );
}

const InputContainer = styled.div`
  input {
    outline: none;

    width: 563px;
    height: 45px;
    border-radius: 8px;
    padding: 0px 23px;
    &::placeholder {
      font-size: 19px;
      font-weight: 400;
      line-height: 23px;
      letter-spacing: 0em;
      text-align: left;
    }
  }
  @media (max-width: 833px) {
    display: none;
  }
`;

const ListUsers = styled.ul`
  position: absolute;

  display: flex;
  flex-direction: column;
  width: 563px;
  height: 176px;
  border-radius: 8px;
  background-color: #e7e7e7;
  gap: 4px;
  a {
    text-decoration: none;
    color: #515151;
  }
  li {
    ${center}
    justify-content: flex-start;
    width: 100%;
    height: 50px;
    gap: 12px;
    background-color: #a7a7a7;
    cursor: pointer;
  }
  h2 {
    font-size: 19px;
    font-weight: 400;
    line-height: 23px;
    letter-spacing: 0em;
    text-align: left;
  }

  img {
    margin-left: 17px;
    width: 39px;
    height: 39px;
    border-radius: 50%;
  }
`;
