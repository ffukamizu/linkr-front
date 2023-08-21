import React, { useContext, useEffect, useRef, useState } from 'react';
import { FiHeart } from 'react-icons/fi';
import { TbTrashFilled } from 'react-icons/tb';
import { FaPen } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import reactStringReplace from 'react-string-replace';
import { styled } from 'styled-components';
import { center } from '../style/utils';
import SessionContext from '../contexts/SessionContext';
import { Form } from './CreatePost';
import { editService } from '../services/apiPost';

export function Post({ id, text, likes, user, link, setIsModalOpen, setIdToDelete, updating, setUpdating }) {
  const { session } = useContext(SessionContext);

  const [isPublishing, setIsPublishing] = useState()
  const [isEditing, setIsEditin] = useState(false);
  const [editValue, setEditValue] = useState('');

  const inputRef = useRef(null);

  useEffect(() => {
    if(isEditing) {
      inputRef.current.focus();
    };
  }, [isEditing]);

  const handleEdit = () => {
    setEditValue(text);
    setIsEditin(!isEditing);
  };

  const editPost = (e) => {
    e.preventDefault();

    setIsPublishing(true);

    editService(id, editValue, session.token)
      .then(res => {
        console.log(res);
        setIsPublishing(false);
        setIsEditin(false);
        setUpdating([...updating]);
      })
      .catch(error => {
        setIsPublishing(false);
        alert("Não foi possível salvar as alterações!");
      });
  };

  const deletePost = () => {
    setIdToDelete(id);
    setIsModalOpen(true);
  };

  return (
    <PostContainer data-test="post">
      <LikesDiv>
        <img src={user.photo} alt="User" />
        <FiHeart size="20px" color="#ffffff" />
        {<p>{likes} likes</p>}
      </LikesDiv>
      <div>
        <h2 data-test="username">{user.name}</h2>

        { isEditing ? (
          <EditForm onSubmit={editPost}>
            <input 
            type="text" 
            disabled={isPublishing}
            ref={inputRef} 
            onKeyUp={e => e.keyCode === 27 && setIsEditin(false)} 
            onChange={(e) => setEditValue(e.target.value)} 
            value={editValue}/> 
          </EditForm>
        ) : (
          <p className="text">
            {reactStringReplace(text, /#(\w+\b)/g, (match, i) => (
              <Link key={i} to={`/hashtag/${match}`} state={match}>
                #{match}
              </Link>
            )) }
          </p>)
        }

        {typeof link === 'object' && (
          <LinkA data-test="link" href={link.url} target="_blank">
            <div>
              <h3>{link.title}</h3>
              <p>{link.description}</p>
              <p>{link.url}</p>
            </div>
            <img src={link.image} alt={link.title} />
          </LinkA>
        )}
        {typeof link === 'string' && (
          <LinkA data-test="link">
            <span>{link}</span>
          </LinkA>
        )}
      {session.id === user.id && 
        <Edit>
          <FaPen 
            size={16}
            color='white'
            onClick={handleEdit}
          />
          <TbTrashFilled data-test='delete-btn'
            size={20} 
            color='white'
            onClick={deletePost}
          />
        </Edit>
      }
      </div>
    </PostContainer>
  );
}

const PostContainer = styled.li`
  position: relative;
  ${center}
  gap: 14px;
  max-width: 611px;
  width: 100%;
  padding: 10px 18px 15px 15px;
  background-color: #171717;
  text-align: start;
  h2 {
    color: #ffffff;
    font-size: 17px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-bottom: 7px;
  }
  p.text {
    color: #b7b7b7;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-bottom: 13px;
    a {
      text-decoration: none;
      cursor: pointer;
      color: #ffffff;
      font-size: 15px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }
  }
  @media (min-width: 625px) {
    width: 100%;
    max-width: 611px;
    min-width: 511px;
    border-radius: 16px;
    padding: 10px 21px 15px 20px;
    gap: 18px;
    h2 {
      font-size: 19px;
      line-height: 23px;
      letter-spacing: 0em;
    }
    p {
      font-size: 17px;
      line-height: 20px;
      letter-spacing: 0em;
    }
    >div:last-child {
      width: 100%;
    }
  }
`;

const LikesDiv = styled.div`
  ${center}
  align-self: flex-start;
  flex-direction: column;
  color: #ffffff;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  svg {
    width: 17px;
    height: 15px;
    margin: 17px 0px 12px;
  }
  p {
    color: #ffffff;
    text-align: center;
    font-size: 9px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  @media (min-width: 625px) {
    img {
      width: 50px;
      height: 50px;
      margin: -3px 0px 0px 0px;
    }
    svg {
      width: 20px;
      height: 18px;
      margin: 19px 0px 4px;
    }
    p {
      font-size: 11px;
      line-height: 13px;
      letter-spacing: 0em;
    }
  }
`;

const LinkA = styled.a`
  ${center}
  text-decoration: none;
  padding: 0px 0px 0px 11px;
  color: #ffffff;
  max-width: 288px;
  min-width: 244px;
  width: 100%;
  flex-shrink: 0;

  background-color: transparent;
  border: 1px solid #4d4d4d;
  border-radius: 12px;
  div {
    flex: 1;
    max-width: 300px;
    h3 {
      color: #cecece;
      font-size: 11px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;

      max-width: 291px;
      margin-right: 43px;
    }
    p {
      color: #9b9595;
      font-size: 9px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      margin: 4px 0px 4px;
    }
    p:last-child {
      color: #cecece;
      text-decoration: none;
      display: inline-block;
      font-size: 9px;
      font-weight: 400;
      line-height: normal;
      margin-right: 43px;
      margin: 4px 43px 0px 0px;
      word-break: break-all;
    }
  }
  > span {
    width: 100%;
    text-align: start;
    color: #cecece;
    text-decoration: none;
    display: inline-block;
    font-size: 12px;
    font-weight: 400;
    line-height: normal;
    margin-right: 43px;
    margin: 4px 43px 0px 0px;
    word-break: break-all;
  }
  img {
    justify-self: flex-end;
    width: 95px;
    height: 115px;
    border-radius: 0px 11px 11px 0px;
    margin-right: -1px;
    border: none;
    object-fit: cover;
  }
  @media (min-width: 625px) {
    padding: 0px 0px 0px 21px;
    max-width: 503px;
    min-width: none;
    width: 100%;
    div {
      flex: 1;
      h3 {
        max-width: 250px;
        font-size: 16px;
        line-height: 19px;
        letter-spacing: 0em;
      }
      p {
        font-size: 11px;
        line-height: 13px;
        letter-spacing: 0em;
      }
    }
    img {
      width: 153px;
      height: 155px;
      border-radius: 0px 13px 13px 0px;
      margin-left: 27px;
    }
    span {
      flex: 1;
      width: 100%;
      padding: 0px 0px 0px 19px;
    }
  }
`;

const Edit = styled.div`
  position: absolute;
  top: 10px;
  right: 22px;
  display: flex;
  gap: 10px;
`;

const EditForm = styled(Form)`
  margin-bottom: 5px;

  input[type=text] {
    color: #4C4C4C;
    font-family: Lato;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    height: 44px;
    padding: 4px 9px;
  };
`;