import React, { useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import ReactMarkdown from 'react-markdown';
import Avatar from '../Avatar/Avatar';
import shortenNumber from '../../utils/shortenNumber'
import { TiMessage } from 'react-icons/ti'
import { PiShareFat } from "react-icons/pi";
import {
	PiArrowFatUp,
	PiArrowFatUpBold,
	PiArrowFatDown,
	PiArrowFatDownBold,
} from 'react-icons/pi'
import { getProfileStyle } from '../../utils/getProfileStyle';


export default function Comment({ comment }) {

  const [voteValue, setVoteValue] = useState(0);

  console.log("Comment:", comment)


  /**
	 * @param {number} newValue The new vote value
	 */
	const onHandleVote = (newValue) => {
		if (newValue === voteValue) {
			setVoteValue(0)
		} else if (newValue === 1) {
			setVoteValue(1)
		} else {
			setVoteValue(-1)
		}
	}

	const renderUpVote = () => {
		if (voteValue === 1) {
			return <PiArrowFatUpBold className="icon-action" />
		}
		return <PiArrowFatUp className="icon-action" />
	}

	const renderDownVote = () => {
		if (voteValue === -1) {
			return <PiArrowFatDownBold className="icon-action" />
		}
		return <PiArrowFatDown className="icon-action" />
	}

	const getVoteType = () => {
		if (voteValue === 1) {
			return 'up-vote'
		}
		if (voteValue === -1) {
			return 'down-vote'
		}

		return ''
	}

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
      <PostDetails>
							<ButtonContainer>
								<Button
									type="button"
									className={`icon-action-button up-vote ${
										voteValue === 1 && 'active'
									}`}
									onClick={() => onHandleVote(1)}
									aria-label="Up vote"
								>
									{renderUpVote()}
								</Button>
								<VoteValue $voteType={getVoteType()}>
									{shortenNumber(comment.ups, 1)}
								</VoteValue>
								<Button
									type="button"
									className={`icon-action-button down-vote ${
										voteValue === -1 && 'active'
									}`}
									onClick={() => onHandleVote(-1)}
									aria-label="Down vote"
								>
									{renderDownVote()}
								</Button>
							</ButtonContainer>
							<ButtonContainer

							>
								<Button
									type="button"
									$isActive={comment.showingComments}
									aria-label="Show comments"
								>
									<TiMessage style={{ fontSize: '2.4rem' }} />
                  <p>Reply</p>
								</Button>
								{shortenNumber(comment.num_comments, 1)}
							</ButtonContainer>
							<ButtonContainer >
								<Button type="button" aria-label="Share">
									<PiShareFat className="icon-action" />
									<p>Share</p>
								</Button>
							</ButtonContainer>
						</PostDetails>
    </CommentContainer>
  );
};


const CommentContainer = styled.div`
  background: ${({ theme }) => theme.colors.background};
  margin: .4rem 0;
  padding: .8rem 0;
  transition: box-shadow 0.1s ease-in;
  border-radius: .4rem;
  > div {
    padding: 0;
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

const PostDetails = styled.div`
	margin: var(--spacing-1) 0;
	font-size: 0.75rem;
	display: flex;
	align-items: center;
	gap: var(--spacing-1);
`
const ButtonContainer = styled.div`
	display: flex;
	align-items: center;
	gap: var(--spacing-1);
	background: none;
	padding: var(--spacing-0) var(--spacing-1);
	border-radius: var(--radius);
	font-size: 1.6rem;
	cursor: pointer;
	&:hover {
		background: ${({ theme }) => theme.colors.elementBackgroundHover};
	}
	.icon-action {
		font-size: 2rem;
	}
`
const Button = styled.button`
	background: none;
	border: none;
	cursor: pointer;
	color: ${({ theme, $isActive }) =>
		$isActive ? theme.colors.success : theme.colors.textParagraph};
	display: flex;
	align-items: center;
	border-radius: var(--radius);
	> p {
		margin-left: 0.4rem;
		padding: 0.35rem;
		font-weight: bold;
		font-size: 1.4rem;
	}
`
const VoteValue = styled.p`
	font-size: 1.4rem;
	font-weight: bold;
	color: ${({ $voteType }) =>
		$voteType === 1
			? 'var(--color-success)'
			: $voteType === -1
			? 'var(--color-alert)'
			: 'inherit'};
`