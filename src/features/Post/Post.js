import React, { useState } from 'react'
import styled from 'styled-components'
import Skeleton from 'react-loading-skeleton'
import { TiMessage } from 'react-icons/ti'
import { LuShare } from "react-icons/lu";
import {
	PiArrowFatUp,
	PiArrowFatUpBold,
	PiArrowFatDown,
	PiArrowFatDownBold,
} from 'react-icons/pi'
import moment from 'moment'
import shortenNumber from '../../utils/shortenNumber'
import Comment from '../Comment/Comment'
import Avatar from '../Avatar/Avatar'

export default function Post(props) {
	const [voteValue, setVoteValue] = useState(0)

	const { post, onToggleComments } = props

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

	const renderComments = () => {
		if (post.errorComments) {
			return (
				<div>
					<h3>Error loading comments</h3>
				</div>
			)
		}

		if (post.loadingComments) {
			return (
				<div>
					<Skeleton />
					<Skeleton />
					<Skeleton />
					<Skeleton />
				</div>
			)
		}

		if (post.showingComments) {
			return (
				<div>
					{post.comments.map((comment) => (
						<Comment comment={comment} key={comment.id} />
					))}
				</div>
			)
		}

		return null
	}

	return (
		<article key={post.id}>
			<Card>
				<PostWrapper>
					<PostContainer>
						<PostHeader>
							<Author>
								<Avatar	userId={post.id}/>
								<AuthorName>{post.author}</AuthorName>
							</Author>
							•
							<TimeCreated>
								{moment.unix(post.created_utc).fromNow()}
							</TimeCreated>
						</PostHeader>
						<PostTitle>{post.title}</PostTitle>

						<ImageContainer>
							<Image src={post.url} alt="" />
						</ImageContainer>

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
									{shortenNumber(post.ups, 1)}
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
							<ButtonContainer>
								<Button
									type="button"
									$isActive={post.showingComments}
									onClick={() =>
										onToggleComments(post.permalink)
									}
									aria-label="Show comments"
								>
									<TiMessage style={{ fontSize: '2.4rem' }}/>
								</Button>
								{shortenNumber(post.num_comments, 1)}
							</ButtonContainer>
							<ButtonContainer>
								<Button
									type="button"
									aria-label="Share"
								>
									<LuShare className="icon-action" />
									<p>Share</p>
								</Button>
							</ButtonContainer>
						</PostDetails>

						{renderComments()}
					</PostContainer>
				</PostWrapper>
			</Card>
		</article>
	)
}

const Card = styled.div`
	background: ${({ theme }) => theme.colors.background};
	box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
		0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;
	margin-bottom: 0.4rem;
	border-radius: 0.4rem;
	padding: 2rem;
	transition: box-shadow 0.1s ease-in;
	color: ${({ theme }) => theme.colors.textParagraph};
	&:hover {
		box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
			0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
	}
	@media only screen and (max-width: 768px) {
		padding: 1rem 0;
	}
	.post-votes-value.up-vote {
		color: var(--color-success) !important;
	}
	.post-votes-value.down-vote {
		color: var(--color-alert) !important;
	}
	.up-vote:hover {
		color: var(--color-success) !important;
	}
	.up-vote.active {
		color: var(--color-success) !important;
	}
	.down-vote:hover {
		color: var(--color-alert) !important;
	}
	.down-vote.active {
		color: var(--color-alert) !important;
	}

	.icon-action-button:hover {
		background: var(--color-on-hover);
	}
	.post-comments-container {
		display: flex;
		align-items: center;
	}
	.post-comments-container .icon-action {
		margin-right: var(--spacing-0);
	}
`

const PostWrapper = styled.div`
	display: flex;
	border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`
const PostContainer = styled.div`
	width: 100%;
	user-select: none;
`
const PostHeader = styled.div`
	display: flex;
	align-items: center;
	gap: 0.875rem;
	margin-bottom: var(--spacing-0);
`
const Author = styled.span`
	display: flex;
	align-items: center;
`
const AuthorName = styled.span`
	margin-left: var(--spacing-1);
	font-size: 1em;
	color: var(--color-branding);
	font-weight: bold;
	cursor: pointer;
`
const TimeCreated = styled.span`
	font-size: 0.75em;
`
const PostTitle = styled.h3`
	margin: 0;
	margin: var(--spacing-1) 0;
	color: ${({ theme }) => theme.colors.textHeading};
`
const ImageContainer = styled.div`
	width: 100%;
	overflow: hidden;
	border-radius: var(--radius-2);
`
const Image = styled.img`
	max-width: 100%;
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
	background: ${({ theme }) => theme.colors.elementBackground};
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
	color: ${({ theme, $isActive }) => ($isActive ? theme.colors.branding : theme.colors.textParagraph)};
	display: flex;
	align-items: center;
	border-radius: var(--radius);
	> p {
		margin-left: .4rem;
		padding: .35rem;
		font-weight: bold;
		font-size: 1.6rem;
	
	}
`
const VoteValue = styled.p`
	font-size: 1.6rem;
	font-weight: bold;
	color: ${({ $voteType }) =>
		$voteType === 1
			? 'var(--color-success)'
			: $voteType === -1
			? 'var(--color-alert)'
			: 'inherit'};
`