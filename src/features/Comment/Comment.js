import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import ReactMarkdown from 'react-markdown';
import Avatar from '../Avatar/Avatar';


export default function Comment({ comment }) {

  return (
    <CommentContainer>
      <Metadata>
        <Avatar name={comment.author} />
        <Author>{comment.author}</Author>
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
  &:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;;
  }
`

const Metadata = styled.div`
  display: flex;
  margin-bottom: 1.6rem;
  align-items: center;
`

const CreatedTime = styled.p`
  margin-left: auto;
  font-style: italic;
`

const Author = styled.p`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.buttonBackground};
`