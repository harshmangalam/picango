import React, { useContext } from "react";
import {
	Row,
	Col,
	Container,
	Card,
	Button,
	Badge,
	Image,
} from "react-bootstrap";
import PostLocation from "./PostLocation"
import Comments from "./Comments";
import DeletePost from "./DeletePost";
import LikeUserPopover from "../User/LikeUserPopover"
import axios from "axios";
import { PostContext, MessageContext, UserContext } from "../../App";

const ENDPOINT = "https://picango.herokuapp.com/api"

const Post = ({ post }) => {
	const { postState, postDispatch } = useContext(PostContext);
	const { messageState, messageDispatch } = useContext(MessageContext);
	const { userState } = useContext(UserContext);

	
	const alreadyLike = () => {
		let isLike = false;
		post.likeBy.map((user) => {
			const user_id = userState.currentUser && userState.currentUser.id;
			if (user.id == user_id) {
				isLike = true;
			}
		});
		return isLike;
	};
	const RemoveLike = async (postId) => {
		try {
			const response = await axios.get(
				`${ENDPOINT}/post/${postId}/remove_like`,
				{
					headers: {
						Authorization: `Bearer ${
							window.localStorage.token &&
							JSON.parse(window.localStorage.token)
						}`,
					},
				}
			);
			messageDispatch({
				type: "MESSAGE",
				payload: { message: response.data.message, variant: "success" },
			});
			const post = await axios.get(
				`${ENDPOINT}/post/${postId}`
			);
			postDispatch({ type: "UPDATE_POST", payload: post.data.post });
		} catch (err) {
			console.log(err);
			if (err) {
				if (err.response.data.general) {
					messageDispatch({
						type: "MESSAGE",
						payload: {
							message: err.response.data.general,
							variant: "danger",
						},
					});
				}
				if (err.response.data.error) {
					messageDispatch({
						type: "MESSAGE",
						payload: {
							message: err.response.data.error,
							variant: "danger",
						},
					});
				}
			}
		}
	};
	const LikePost = async (postId) => {
		try {
			const response = await axios.get(
				`${ENDPOINT}/post/${postId}/add_like`,
				{
					headers: {
						Authorization: `Bearer ${
							window.localStorage.token &&
							JSON.parse(window.localStorage.token)
						}`,
					},
				}
			);
			messageDispatch({
				type: "MESSAGE",
				payload: { message: response.data.message, variant: "success" },
			});
			const post = await axios.get(
				`${ENDPOINT}/post/${postId}`
			);
			postDispatch({ type: "UPDATE_POST", payload: post.data.post });
		} catch (err) {
			console.log(err);
			if (err) {
				if (err.response.data.general) {
					messageDispatch({
						type: "MESSAGE",
						payload: {
							message: err.response.data.general,
							variant: "danger",
						},
					});
				}
				if (err.response.data.error) {
					messageDispatch({
						type: "MESSAGE",
						payload: {
							message: err.response.data.error,
							variant: "danger",
						},
					});
				}
			}
		}
	};

	return (
		<div>
			{post && (
				<Card className="my-3 bg-white border shadow">
					<Container>
						<div
							className="p-3"
							style={{
								display: "flex",
								flexDirection: "row",
								flex: 1,
								flexWrap: "nowrap",
								justifyContent: "flex-start",
								alignItems: "center",
								marginX:4
							}}
						>
							{userState.currentUser && userState.currentUser.id === post.user.id && post.user.profile_pic ? (
								<div className="">
									<img
									width="60px"
									height="60px"					
									style={{ borderRadius: "100%",border:"4px solid tomato" }}
									src={userState.currentUser.profile_pic}
								/>
								</div>
							) : post.user.profile_pic && (<img
									width="60px"
									height="60px"
									
									
									style={{ borderRadius: "100%",border:"4px solid pink"}}
									src={post.user.profile_pic}
								/>)}
							
							<div className="mx-3">{post.user.name}</div>
							<div className="text-muted">
								<small>
									{new Date(post.createdAt).toLocaleString()}
								</small>
							</div>
							
							
							
							
							<div className="">
								{userState.currentUser && post.user.id === userState.currentUser.id ? <DeletePost postId={post.id} /> : null}
							</div>
							</div>
							
						

						<div className="my-2">
							
						</div>
						<Card.Body>
							{post.body.image && (
									<img src={post.body.image} width="100%" style={{height:"450px"}} />
								)}
							{post.body.text && (
									<Card.Text><div className="my-3 text-muted">{post.body.text}</div></Card.Text>
								)}

							{post.body.location &&  (
									<PostLocation page="post" user={post.user} coords={post.body.location} />)}
						
							
							<div className="my-3">
								{alreadyLike() ? (
									<>
										<Button
											size="sm"
											onClick={() => RemoveLike(post.id)}
										>
											<span className="material-icons">favorite</span>
										</Button>
									</>
								) : (

								<Button
										size="sm"
										onClick={() => LikePost(post.id)}
									>
										<span className="material-icons">favorite_border</span>
										
									</Button>
								)}
								<LikeUserPopover user={post.likeBy}  />								
								<Comments post={post} />
							</div>
						</Card.Body>
					</Container>
				</Card>
			)}
		</div>
	);
};

export default Post;
