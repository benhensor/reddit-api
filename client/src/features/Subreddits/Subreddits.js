import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubreddits, selectSubreddits } from '../../store/subRedditsSlice';
import {
  setSelectedSubreddit,
  selectSelectedSubreddit,
} from '../../store/redditSlice';
import Avatar from '../Avatar/Avatar';
import { getProfileStyle } from '../../utils/getProfileStyle';

export default function Subreddits() {
  const dispatch = useDispatch();
  const subreddits = useSelector(selectSubreddits);
  const selectedSubreddit = useSelector(selectSelectedSubreddit);

  useEffect(() => {
    dispatch(fetchSubreddits());
  }, [dispatch]);

  return (
    <Card>
      <h2>Subreddits</h2>
      <ul>
        {subreddits.map((subreddit) => (
          <li
            key={subreddit.id}
            className={`${
              selectedSubreddit === subreddit.url && `selected-subreddit`
            }`}
          >
            <button
              type="button"
              onClick={() => dispatch(setSelectedSubreddit(subreddit.url))}
            >
              {subreddit.icon_img ? (
                <img
                  src={subreddit.icon_img}
                  alt={`${subreddit.display_name}`}
                  style={{ border: `3px solid ${subreddit.primary_color}` }}
                />
              ) : (
                <Avatar profileStyle={getProfileStyle()} />
              )}
              {subreddit.display_name}
            </button>
          </li>
        ))}
      </ul>
    </Card>
  );
};


const Card = styled.div`
  margin-bottom: var(--spacing-0);
  border-radius: var(--spacing-0);
  transition: box-shadow 0.1s ease-in;
  color: ${({ theme }) => theme.colors.textParagraph};
  h2 {
    margin-top: 0;
    color: ${({ theme }) => theme.colors.textHeader};
  }
  button {
    background: none;
    border: none;
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.colors.textParagraph};
    font-weight: 600;
    cursor: pointer;
    width: 100%;
    padding: 1.6rem;
    border-radius: .4rem;
    gap: var(--spacing-1);
    transition: .12s;
    .selected-subreddit {
      border-left: 5px solid var(--color-branding);
      background: var(--color-branding-transparent);
    }
    &:hover {
      background: ${({ theme }) => theme.colors.elementBackgroundHover};
    }
  }
  ul {
    list-style: none;
    padding: 0;
  }
  li .selected-subreddit {
    border-left: 5px solid var(--color-branding);
    background: var(--color-branding-transparent);
  }
  img {
    height: 3rem;
    width: 3rem;
    border-radius: 50%;
  }
`