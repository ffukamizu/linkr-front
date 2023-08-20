import React, { useState } from "react";
import { styled } from "styled-components";
import { PostAvatar } from "./Avatar";
import StyledLoginButton from "../style/StyledLoginButton";
import { publishService } from "../services/apiPost";

const CreatePost = ({userImage}) => {
  const [link, setLink] = useState('');
  const [text, setText] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);

  const publish = (e) => {
    e.preventDefault();
    setIsPublishing(true);

    let url = link;

    if(!link.includes('http://') && !link.includes('https://')) url = `http://${link}`;

    // publishService(url, text, token) // need the token from useContext
    publishService(url, text)
      .then(res => {
        console.log(res)
        setIsPublishing(false);
        setLink('');
        setText('');
      })
      .catch(error => {
        setIsPublishing(false);
        alert("Houve um erro ao publicar seu link");
    });
  };

  return (
    <SCNewPostContainer>
      <PostAvatar userImage={userImage}/>
      <h1>What are you going to share today?</h1>
      <Form onSubmit={publish}>
        <input 
          type="text" 
          placeholder="http:// ..."
          disabled={isPublishing}
          required
          onChange={e => setLink(e.target.value)}
          value={link}
        />
        <textarea 
          type="textarea" 
          placeholder="Awesome article about #javascript" 
          maxLength={200}
          disabled={isPublishing}
          onChange={e => setText(e.target.value)}
          value={text}
        />
        <PublishBtn 
          type="submit" 
          disabled={isPublishing}
        >
          {isPublishing ? 'Publishing...' : 'Publish'}
        </PublishBtn>
      </Form>
    </SCNewPostContainer>
  );
};

export default CreatePost;

const SCNewPostContainer = styled.div`
  width: 100%;
  height: 164px;
  position: relative;
  padding: 10px 15px 12px 26px;

  background: #FFF;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  
  @media (min-width: 625px) {
    width: 611px;
    height: 209px;
    padding: 21px 22px 16px 87px;
    border-radius: 16px;
  };

  h1 {
    color: #707070;
    font-family: Lato;
    font-size: 17px;
    font-weight: 300;
    line-height: normal;

    @media (min-width: 625px) {
      font-size: 20px;
    };
  }
`;

const Form = styled.form`
  position: relative;
  margin-top: 5px;
  height: 88%;
  display: flex;
  flex-direction: column;
  gap: 13px;

  input, textarea {
    color: #949494;
    font-family: Lato;
    font-size: 13px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;

    outline: none;
    border: none;
    border-radius: 7px;

    &:disabled {
      cursor: wait;
    }

    @media (min-width: 625px) {
      font-size: 15px;
    };
  };

  input[type=text] {
    height: 30px;
  };

  textarea {
    width: 100%;
    height: 44px;
    padding-top: 0;
    resize: none;

    @media (min-width: 625px) {
      height: 60px;
    };
  };
`;

const PublishBtn = styled(StyledLoginButton)`
  position: absolute;
  bottom: 12px;
  right: 0;
  width: 112px;
  height: 22px;
  
  font-family: Lato;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;

  &:disabled {
    cursor: wait;
  }
  
  @media (min-width: 625px) {
    font-size: 14px;
    height: 31px;
  };
`;