import React, { useState } from 'react';
import { styled } from 'styled-components';
import { Post } from '../components/Post.jsx';
import { center } from '../style/utils';

export function HashtagPage() {
  const [posts, setPosts] = useState([
    {
      id: 44574755,
      text: 'Muito maneiro esse tutorial de Material UI com React, deem uma olhada! #react #material',
      link: {
        url: 'https://medium.com/@pshrmn/a-simple-react-router',
        title: `Como aplicar o Material UI em um projeto React`,
        image: '',
        description: `Hey! I have moved this tutorial to my personal blog. Same content, new location. Sorry about making you
        click through to another page.`,
      },
      user: {
        name: 'Juvenal Juvêncio',
        photo: '',
      },
    },
  ]);
  /* useEffect(() => {
    // In the future, this will require a token.
    // , {headers: { Authorization: `Bearer ${user?.token}` }} 
  server.get(`/posts`).then(({ data }) => {
    console.log([...posts, ...data]);
    setPosts([...posts, ...data]);
    }).catch((err) => {
      console.log(err);
    });
  }, []); 
  */

  return (
    <HashtagContainer>
      <h1>Hashtag Page</h1>
      {posts.map(p => <Post key={p.id} user={p.user} text={p.text} link={p.link} />)}
    </HashtagContainer>
  );
}

const HashtagContainer = styled.div`
  ${center}
  flex-direction: column;
  background-color: #333333;
  height: 100svh;
`;
