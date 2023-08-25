import React, { useContext, useEffect, useRef, useState } from 'react';
import { AiOutlineComment } from "react-icons/ai";
import { FaPen, FaRetweet } from 'react-icons/fa';
import { FcLike } from 'react-icons/fc';
import { FiHeart } from 'react-icons/fi';
import { TbTrashFilled } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import reactStringReplace from 'react-string-replace';
import { Tooltip } from 'react-tooltip';
import { styled } from 'styled-components';
import SessionContext from '../contexts/SessionContext';
import { editService, extractMetadata, getComms, likePost } from '../services/apiPost';
import { center } from '../style/utils';
import { Comments } from './Comments';
import { Form } from './CreatePost';

export function Post({ id, text, link, likes, owner, updating, isliked, mrliker, srliker, setters, totalcomms }) {
  const [ setIsModalOpen, setIdToDelete, setIdToRepost, setUpdating ] = setters;
  const { session } = useContext(SessionContext);
  const [localNumLikes, setlocalNumLikes] = useState(Number(likes));
  const [localIsLiked, setLocalIsLiked] = useState(isliked);
  const [isPublishing, setIsPublishing] = useState();
  const [isEditing, setIsEditin] = useState(false);
  const [editValue, setEditValue] = useState('');
  const [awaitLike, setAwaitLike] = useState(false);
  const [comments, setComments] = useState([])
  const [showComs, setShowComs] = useState(false)
  const [localTotalComms, setLocalTotalComms] = useState(Number(totalcomms))

  const inputRef = useRef(null);
  const [linkPreview, setLinkPreview] = useState(link);
  const { url = link, title = '', description = '', image = '' } = linkPreview || {};

  useEffect(() => {
    if (typeof link === 'string') {
    extractMetadata(link)
      .then(
        ({ data: { url, title, description, images: [image]} }) => {
          setLinkPreview({ url, title, description, image });
        }
      )
      .catch((err) => {
        setLinkPreview(null);
      })
    }

      if (isEditing) {
        inputRef.current.focus();
      }
  }, [link,isEditing,id]);

  const handleEdit = () => {
    setEditValue(text);
    setIsEditin(!isEditing);
  };

  const editPost = (e) => {
    e.preventDefault();

    setIsPublishing(true);

    editService(id, editValue, session.token)
      .then((res) => {
        console.log(res);
        setIsPublishing(false);
        setIsEditin(false);
        setUpdating([...updating]);
      })
      .catch((error) => {
        setIsPublishing(false);
        alert('Não foi possível salvar as alterações!');
      });
  };

  const deletePost = () => {
    setIdToDelete(id);
    setIsModalOpen(true);
  };

  function handleLike(id) {
    if (awaitLike) return;
    setAwaitLike(true);
    likePost(id, session.token)
      .then((res) => {
        console.log(res, typeof likes, typeof localNumLikes);
        if (res.status === 201) {
          setLocalIsLiked(true);
          setlocalNumLikes(localNumLikes + 1);
          setAwaitLike(false);
        } else {
          setLocalIsLiked(false);
          setlocalNumLikes(localNumLikes - 1);
          setAwaitLike(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const repost = () => {
    setIdToRepost(id);
    setIsModalOpen(true);
  };

  function getComments(id){
    getComms(session.token, id)
    .then((res)=>{
      console.log(res.data)
      setComments(res.data)
      setLocalTotalComms(res.data.length)
    })
    .catch((err) => {
      console.log(err)
    })
    setShowComs(!showComs)
  }

  return (
    <PostOutterContainer>
    <PostContainer data-test="post">
      <LikesDiv>
        <img src={owner.photo} alt="User" />
        {localIsLiked ? (
          <FcLike data-test="like-btn" onClick={() => handleLike(id)} size="20px" />
        ) : (
          <FiHeart data-test="like-btn" onClick={() => handleLike(id)} size="20px" color="#ffffff" />
        )}
        <p data-test="counter" data-tooltip-id={`Likes${id}`}>
          {localNumLikes} likes
        </p>
        <Tooltip
          data-test="tooltip"
          id={`Likes${id}`}
          place="bottom"
          content={
            localNumLikes === 0
              ? 'Ninguém curtiu ainda'
              : mrliker === null
                ? 'Você curtiu isso'
                : localIsLiked
                  ? `Você, ${mrliker} e ${localNumLikes - 2} pessoas`
                  : srliker === null
                    ? `${mrliker} curtiu isso`
                    : `${mrliker}, ${srliker} e ${localNumLikes - 2} pessoas`
          }
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.90)',
            color: '#505050',
            width: 'auto',
            height: '24px',
            fontFamily: 'Lato',
            fontSize: '11px',
            fontWeight: '700',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: '10',
          }}
        />
        <AiOutlineComment data-test="comment-btn" onClick={()=> getComments(id)}/>
        <p data-test="comment-counter" >{localTotalComms} comments</p>
        <FaRetweet data-test="repost-btn" onClick={repost} />
        <p data-test="repost-counter">{`0 re-posts`}</p>
      </LikesDiv>
      <div>
        <h2 data-test="username">{owner.name}</h2>

        {isEditing ? (
          <EditForm onSubmit={editPost}>
            <input
              data-test="edit-input"
              type="text"
              disabled={isPublishing}
              ref={inputRef}
              onKeyUp={(e) => e.keyCode === 27 && setIsEditin(false)}
              onChange={(e) => setEditValue(e.target.value)}
              value={editValue}
            />
          </EditForm>
        ) : (
          <p data-test="description" className="text">
            {reactStringReplace(text, /#(\w+\b)/g, (match, i) => (
              <Link key={i} to={`/hashtag/${match}`} state={match}>
                #{match}
              </Link>
            ))}
          </p>
        )}

        {linkPreview && (
          <LinkA data-test="link" href={url} target="_blank">
            <div>
              <h3>{title}</h3>
              <p>{description}</p>
              <span>{url}</span>
            </div>
            <img src={image} alt={title} />
          </LinkA>
        )}
        {linkPreview === null && (
          <LinkA data-test="link">
            <div>
              <span>{link}</span>
            </div>
          </LinkA>
        )}
        {session.id === owner.id && (
          <Edit>
            <FaPen data-test="edit-btn" size={16} color="white" onClick={handleEdit} />
            <TbTrashFilled data-test="delete-btn" size={20} color="white" onClick={deletePost} />
          </Edit>
        )}
      </div>
    </PostContainer>
    {showComs && <Comments id={id} comments={comments} setComments={setComments}/>}

    </PostOutterContainer>
  );
}

const PostOutterContainer = styled.li`
  position: relative;
  display:flex;
  flex-direction:column;
  ${center}
  gap: 0;
  max-width: 611px;
  width: 100%;
  padding: 0;
  background-color: #1E1E1E;
  text-align: start;
  @media (min-width: 625px) {
    width: 100%;
    max-width: 611px;
    min-width: 511px;
    border-radius: 16px;
    padding: 0;
    gap: 0;
  }
`;

const PostContainer = styled.div`
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
    max-width: 288px;
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
    p.text {
      max-width: 503px;
    }
    p {
      font-size: 17px;
      line-height: 20px;
      letter-spacing: 0em;
    }
    > div:last-child {
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
    white-space:nowrap;
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
  width: 288px;
  min-width: 288px;
  flex-shrink: 0;

  background-color: transparent;
  border: 1px solid #4d4d4d;
  border-radius: 12px;
  div {
    flex: 1;
    max-width: 300px;
    width: 100%;
    h3 {
      color: #cecece;
      font-size: 11px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;

      max-width: 291px;
      margin-right: 23px;
    }
    p {
      color: #9b9595;
      font-size: 9px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      margin: 4px 0px 4px;
    }
    p {
      color: #cecece;
      text-decoration: none;
      display: inline-block;
      font-size: 9px;
      font-weight: 400;
      line-height: normal;
      margin: 4px 23px 0px 0px;
    }
    span {
      width: 100%;
      text-align: start;
      color: #cecece;
      text-decoration: none;
      display: inline-block;
      font-size: 12px;
      font-weight: 400;
      line-height: normal;
      margin: 4px 23px 4px 0px;
      word-break: break-all;
    }
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
    min-width: 375px;
    width: 100%;
    div {
      width: 100%;
      flex: 1;
      h3 {
        width: 100%;
        max-width: 250px;
        font-size: 16px;
        line-height: 19px;
        letter-spacing: 0em;
        margin-right: 0px;
      }
      p {
        width: 100%;
        font-size: 11px;
        line-height: 13px;
        letter-spacing: 0em;
        margin: 6px 0px 12px;
      }
      span {
        flex: 1;
        width: 100%;
        padding: 0px 0px 0px 0px;
      }
    }
    img {
      width: 153px;
      height: 155px;
      border-radius: 0px 13px 13px 0px;
      margin-left: 27px;
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

  input[type='text'] {
    color: #4c4c4c;
    font-family: Lato;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    height: 44px;
    padding: 4px 9px;
  }
`;
