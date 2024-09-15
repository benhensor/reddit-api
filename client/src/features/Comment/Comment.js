import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import ReactMarkdown from 'react-markdown';
import Avatar from '../Avatar/Avatar';
import { getProfileStyle } from '../../utils/getProfileStyle';


export default function Comment({ comment }) {

  return (
    <CommentContainer>
      <Metadata>
        <Avatar profileStyle={getProfileStyle()} />
        <Author>{comment.author}</Author>
        •
        <CreatedTime>
          {moment.unix(comment.created_utc).fromNow()}
        </CreatedTime>
      </Metadata>
      <ReactMarkdown children={comment.body} />
    </CommentContainer>
  );
};


const CommentContainer = styled.div`
  background: ${({ theme }) => theme.colors.background};
  margin: .4rem 0;
  padding: .8rem;
  transition: box-shadow 0.1s ease-in;
  border-radius: .4rem;
  > div {
    padding: 0 1rem;
  }
  &:hover {
    box-shadow: 0 0 15px -3px rgba(0, 0, 0, 0.3),
    0 0 6px -2px rgba(0, 0, 0, 0.05) !important;
  }
`

const Metadata = styled.div`
  display: flex;
  margin-bottom: 1rem;
  align-items: center;
  gap: 1rem;
  padding: 0;
`

const CreatedTime = styled.p`
  font-size: 1.2rem;
`

const Author = styled.p`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.buttonBackground};
  cursor: pointer;
`