import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import useSession from '../hooks/useSession.js';
import { server } from '../services/utils.js';
import { LogH2, center } from '../style/utils.js';
import { Post } from './Post.js';
import { Trending } from './Trending.js';
import ReactModal from 'react-modal';
import { deleteService, repostService } from '../services/apiPost.js';

export function Timeline({ from, updating, setUpdating, trending = true }) {
  const [posts, setPosts] = useState('Loading');
  const { session } = useSession();
  const token = session === null ? undefined: session.token;
    
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [idToRepost, setIdToRepost] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    server
      .get(from, { headers: { Authorization: `Bearer ${token}` } })
      .then(({ data }) => {
        setPosts(data);
        console.log(data)
      })
      .catch((err) => {
        setPosts(null);
        console.log(err);
      });
    setPosts('Loading');
  }, [updating, from, token]);

  const deletePost = () => {
    setIsDeleting(true);

    deleteService(idToDelete, session.token)
      .then(res => {
        setIsDeleting(false);
        setIsModalOpen(false);
        setUpdating([...updating]);
      })
      .catch(error => {
        setIsDeleting(false);
        setIsModalOpen(false);
        alert("Não foi possível excluir este post!");
      });

    setIdToDelete(null);
  };

  const repostPost = () => {
    setIsDeleting(true);
    
    repostService(idToRepost, session.token )
      .then(res => {
        setIsDeleting(false);
        setIsModalOpen(false);
        setUpdating([...updating]);
      })
      .catch(error => {
        setIsDeleting(false);
        setIsModalOpen(false);
        alert("Não foi possível repostar este link!")
      });

    setIdToRepost(false);
  };

  return (
    <TimelineContainer>
      <main>
        {posts === 'Loading' && <LogH2 data-test="message">Loading</LogH2>}
        {Array.isArray(posts) && posts.length === 0 && <LogH2 data-test="message">There are no posts yet</LogH2>}
        {posts === null && (
          <LogH2 data-test="message">An error occured while trying to fetch the posts, please refresh the page</LogH2>
        )}
        {Array.isArray(posts) && (
          <ul>
            {posts.map((p) => (
              <Post key={p.id} id={p.id} user={p.user} text={p.text} isLiked={p.isLiked} likes={p.likes} link={p.link} updating={updating} 
              setUpdating={setUpdating} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} setIdToDelete={setIdToDelete} setIdToRepost={setIdToRepost} mrliker={p.mrliker} srliker={p.srliker}/>
            ))}
          </ul>
        )}
        <ReactModal
          isOpen={isModalOpen}
          className="Modal"
          overlayClassName="Overlay"
          ariaHideApp={false}
          shouldCloseOnOverlayClick={true}
          shouldCloseOnEsc={true}
        >
          {
            idToDelete ?
              isDeleting ? <h1>Loading...</h1> 
              : <>
                  <h1>Are you sure you want to delete this post?</h1>
                  <div>
                  <button 
                    data-test='cancel' 
                    onClick={() => {
                        setIdToDelete(null);
                        setIsModalOpen(false);
                      }
                    }
                  >
                    No, go back
                  </button>
                    <button data-test='confirm' onClick={() => deletePost()}>Yes, delete it</button>
                  </div>
                </>
            : isDeleting ? <h1>Loading...</h1> 
              :
              <>
                <h1>Do you want to re-post this link?</h1>
                <div>
                  <button 
                    data-test='cancel' 
                    onClick={() => {
                        setIdToRepost(null);
                        setIsModalOpen(false);
                      }
                    }
                  >
                    No, cancel
                  </button>
                  <button data-test='confirm' onClick={() => repostPost()}>Yes, share!</button>
                </div>
              </>
          }
        </ReactModal>
      </main>
      {trending && <Trending />}
    </TimelineContainer>
  );
}

const TimelineContainer = styled.div`
  ${center}
  gap: 25px;
  align-items: flex-start;
  width: 100%;

  main {
    width: 100%;
    > ul {
      width: 100%;
      ${center}
      flex-direction: column;
      gap: 16px;
    }
  }
  @media (min-width: 833px) {
    padding: 0px 16px;
    main {
      width: 100%;
      max-width: 611px;
      text-align: center;
    }
  }
`;