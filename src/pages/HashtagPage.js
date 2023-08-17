import React, { useState } from 'react';
import { styled } from 'styled-components';
import { Post } from '../components/Post.jsx';
import image from '../components/image.svg';
import photo from '../components/user.svg';
import { center } from '../styles.js';

export function HashtagPage() {
  const [posts, setPosts] = useState([
    {
      text: 'Muito maneiro esse tutorial de Material UI com React, deem uma olhada! #react #material',
      link: {
        url: 'https://medium.com/@pshrmn/a-simple-react-router',
        title: `Como aplicar o Material UI em um projeto React`,
        image,
        description: `Hey! I have moved this tutorial to my personal blog. Same content, new location. Sorry about making you
        click through to another page.`,
      },
      likes: 13,
      user: {
        name: 'Juvenal Juvêncio',
        photo,
      },
    },
  ]);
  /* useEffect(() => {
    server.get(``, {
      headers: { Authorization: `Bearer ${user?.token}` },
    }).then(({ data }) => {
      console.log(data);
      setDetails(data);
    }).catch((err) => {
      console.log(err);
    });
  }, []); */


  return (
    <HashtagContainer>
      <h1>Hashtag Page</h1>
      {posts.map(p => <Post key={p.id} user={p.user} likes={p.likes} link={p.link} />)}
    </HashtagContainer>
  );
}

const HashtagContainer = styled.div`
  ${center}
  flex-direction: column;
  background-color: #333333;
  height: 100svh;
`;
