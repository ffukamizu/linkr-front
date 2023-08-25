import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { TailSpin } from 'react-loader-spinner';
import ReactModal from 'react-modal';
import { styled } from 'styled-components';
import useSession from '../hooks/useSession.js';
import { deleteService, repostService } from '../services/apiPost.js';
import { server } from '../services/utils.js';
import { LogH2, center } from '../style/utils.js';
import { Post } from './Post.js';
import { Trending } from './Trending.js';

export function Timeline({ from, updating, setUpdating, trending = true }) {
  const [lposts, setPosts] = useState('Loading');
  const [owner, setOwner] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(true);
  const { session } = useSession();
  const token = session === null ? undefined : session.token;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [idToRepost, setIdToRepost] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    server
      .get(from, { headers: { Authorization: `Bearer ${token}` } })
      .then(({ data }) => {
        const { posts, ...owner } = Array.isArray(data) ? {} : data;
        setPosts([...posts, ...((typeof data === "string" || Array.isArray(data)) ? data : posts)]);
        setOwner(Array.isArray(data) ? null : owner);
      })
      .catch((err) => {
        setPosts(null);
        console.log(err);
      });
    setPosts('Loading');
  }, [updating, from, token]);

  const scrollAction = () => {
    if (loadingMore) {
      setLoadingMore(false);
      server
        .get(`${from}?offset=${lposts.length}`, { headers: { Authorization: `Bearer ${token}` } })
        .then(({ data }) => {
          const { posts, ...owner } = Array.isArray(data) ? {} : data;
          const loadPosts = [...lposts, ...((typeof data === "string" || Array.isArray(data)) ? data : posts)];
          setPosts(loadPosts);
          setOwner(Array.isArray(data) ? null : owner);
          setHasMore((Array.isArray(data) ? data.length : posts.length) === 10)
          setLoadingMore(true);
        })
        .catch((err) => {
          setPosts(null);
          console.log(err);
        });
    }
  }

  const deletePost = () => {
    setIsDeleting(true);

    deleteService(idToDelete, session.token)
      .then((res) => {
        setIsDeleting(false);
        setIsModalOpen(false);
        setUpdating([...updating]);
      })
      .catch((error) => {
        setIsDeleting(false);
        setIsModalOpen(false);
        alert('Não foi possível excluir este post!');
      });

    setIdToDelete(null);
  };

  const repostPost = () => {
    setIsDeleting(true);

    repostService(idToRepost, session.token)
      .then((res) => {
        setIsDeleting(false);
        setIsModalOpen(false);
        setUpdating([...updating]);
      })
      .catch((error) => {
        setIsDeleting(false);
        setIsModalOpen(false);
        alert('Não foi possível repostar este link!');
      });

    setIdToRepost(false);
  };

  const setters = [setIsModalOpen, setIdToDelete, setIdToRepost, setUpdating];

  return (
    <TimelineContainer>
      <main>
        {(typeof lposts === 'string') && <LogH2 data-test="message">{lposts}</LogH2>}
        {Array.isArray(lposts) && lposts.length === 0 && <LogH2 data-test="message">There are no posts yet</LogH2>}
        {lposts === null && (
          <LogH2 data-test="message">
            An error occured while trying to fetch the posts, please refresh the page
          </LogH2>
        )}
        {Array.isArray(lposts) && (
          <InfiniteScroll
            pageStart={0}
            loadMore={scrollAction}
            hasMore={hasMore}
            loader={
              <div className="loader" key={lposts.length % 2}>
                <TailSpin
                  height="36"
                  width="36"
                  color="#6D6D6D"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
                <h2>Loading more posts...</h2>
              </div>
            }
          >
            {<ul>
              {lposts.map((p) => (
              <Post
                id={p.id}
                key={p.id}
                text={p.text}
                link={p.link}
                owner={owner || p.owner}
                likes={p.likes}
                setters={setters}
                updating={updating}
                isliked={p.isLiked}
                mrliker={p.mrliker}
                srliker={p.srliker}
                isModalOpen={isModalOpen}
                totalcomms={p.totalcomms}
              />
            ))}
            </ul>}
          </InfiniteScroll>
        )}
        <ReactModal
          isOpen={isModalOpen}
          className="Modal"
          overlayClassName="Overlay"
          ariaHideApp={false}
          shouldCloseOnOverlayClick={true}
          shouldCloseOnEsc={true}
        >
          {idToDelete ? (
            isDeleting ? (
              <h1>Loading...</h1>
            ) : (
              <>
                <h1>Are you sure you want to delete this post?</h1>
                <div>
                  <button
                      data-test="cancel"
                    onClick={() => {
                      setIdToDelete(null);
                      setIsModalOpen(false);
                    }}
                  >
                    No, go back
                  </button>
                    <button data-test="confirm" onClick={() => deletePost()}>
                      Yes, delete it
                    </button>
                  </div>
                </>
            )
          ) : isDeleting ? (
            <h1>Loading...</h1>
          ) : (
            <>
              <h1>Do you want to re-post this link?</h1>
              <div>
                <button
                      data-test="cancel"
                      onClick={() => {
                        setIdToRepost(null);
                        setIsModalOpen(false);
                      }}
                    >
                      No, cancel
                    </button>
                    <button data-test="confirm" onClick={() => repostPost()}>
                      Yes, share!
                    </button>
                  </div>
                </>
          )}
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
    > div {
        display: flex;
        justify-content: center;
        flex-direction: column;
        ul {
          width: 100%;
          ${center}
          flex-direction: column;
          gap: 16px;
       }
    }
    .loader {
        margin: 83px auto 308px;
        ${center}
        flex-direction: column;
        h2 {
        color: #6D6D6D;
        font-size: 22px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        letter-spacing: 1.1px;
      }
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
