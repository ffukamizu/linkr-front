import React, { useEffect, useState } from 'react';
import { server } from '../services/utils.js';
import { LogH2 } from '../style/utils.js';
import { Post } from './Post.js';

export function Timeline({ from }) {
  const [posts, setPosts] = useState('Loading');
  useEffect(() => {
    // In the future, this will require a token.
    // , {headers: { Authorization: `Bearer ${user?.token}` }}
    setPosts('Loading');
    server
      .get(from, {})
      .then(({ data }) => {
        setPosts(data);
      })
      .catch((err) => {
        setPosts(null)
        console.log(err);
      });
  }, []);

  return (
    <ul>
      <LogH2>
        {posts === 'Loading' && posts}
        {Array.isArray(posts) && posts.length === 0 && 'There are no posts yet'}
        {posts === null && 'An error occured while trying to fetch the posts, please refresh the page'}
      </LogH2>
      {Array.isArray(posts) &&
        posts.map((p) => <Post key={p.id} user={p.user} text={p.text} likes={p.likes} link={p.link} />)}
    </ul>
  );
}
