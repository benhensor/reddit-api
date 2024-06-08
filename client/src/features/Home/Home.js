import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import Post from '../Post/Post';
import PostLoading from '../Post/PostLoading';
import getRandomNumber from '../../utils/getRandomNumber';
import {
  fetchPosts,
  selectFilteredPosts,
  setSearchTerm,
  fetchComments,
} from '../../store/redditSlice';

export default function Home () {
  const reddit = useSelector((state) => state.reddit);
  const { isLoading, error, searchTerm, selectedSubreddit } = reddit;
  const posts = useSelector(selectFilteredPosts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts(selectedSubreddit));
  }, [dispatch, selectedSubreddit]);

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {Array.from({ length: getRandomNumber(3, 10) }, (_, index) => (
          <PostLoading key={index} />
        ))}
      </motion.div>
    );
  }

  if (error) {
    return (
      <Error className="error">
        <h2>Failed to load posts.</h2>
        <ErrorButton
          type="button"
          onClick={() => dispatch(fetchPosts(selectedSubreddit))}
        >
          Try again
        </ErrorButton>
      </Error>
    );
  }

  if (posts.length === 0) {
    return (
      <Error className="error">
        <h2>No posts matching "{searchTerm}"</h2>
        <ErrorButton type="button" onClick={() => dispatch(setSearchTerm(''))}>
          Go home
        </ErrorButton>
      </Error>
    );
  }

  return (
    <>
      {posts.map((post, index) => (
        <Post
          key={post.id}
          post={post}
          index={index}
        />
      ))}
    </>
  );
};


const Error = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const ErrorButton = styled.button`
  color: ${({ theme }) => theme.colors.textHeading};
  background: ${({ theme }) => theme.colors.logoRed};
  border: none;
  border-radius: var(--spacing-0);
  font-size: 1rem;
  padding: 1.6rem 3.6rem;
  cursor: pointer;
`