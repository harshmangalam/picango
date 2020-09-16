import React, { useContext, useState, useEffect } from "react";
import {
	Button,
	Badge,
	Modal,
	Card,
	Row,
	Col,
	Container,
	Image,
	Form,
	Spinner,
	Alert,
} from "react-bootstrap";
import { PostContext, UserContext } from "../../App";

import commentImage from "../../image/comment.png";
import axios from "axios";
import ReplyComment from "./ReplyComment";

const ENDPOINT = "https://picango.herokuapp.com/api";

const Comments = ({ post }) => {
	const { postState, postDispatch } = useContext(PostContext);
	const { userState, userDispatch } = useContext(UserContext);

	const [showReply, setShowReply] = useState("none");

	const [showModal, setShowModal] = useState(false);
	const [text, setText] = useState("");
	const [message, setMessage] = useState(null);
	const [loading, setLoading] = useState(false);

	const deleteComment = async (e, postId, commentId) => {
		e.preventDefault();
		setLoading(true)
		try {
			const response = await axios.delete(
				`${ENDPOINT}/post/${postId}/comment/${commentId}`,
				{
					headers: {
						Authorization: `Bearer ${JSON.parse(
							window.localStorage.token
						)}`,
					},
				}
			);
			const user = await axios.get(
				`${ENDPOINT}/user/${userState.currentUser.id}`
			);
			const post = await axios.get(`${ENDPOINT}/post/${postId}`);
			postDispatch({ type: "DELETE_COMMENT", payload: commentId });
			postDispatch({ type: "UPDATE_POST", payload: post.data.post });

			userDispatch({
				type: "LOAD_CURRENT_USER",
				payload: user.data.user,
			});
			userDispatch({ type: "UPDATE_USER", payload: user.data.user });

			setMessage({ message: response.data.message, variant: "success" });
		} catch (error) {
			if (error.response.status === 500) {
				console.log(error.response.data);
			} else {
				if (error.response.data.general) {
					setMessage({
						message: error.response.data.error,
						variant: "danger",
					});
				}
				if (error && error.response.data.error) {
					setMessage({
						message: error.response.data.error,
						variant: "danger",
					});
				}
			}
		}
		setLoading(false);
	};

	const LikeComment = async (commentId) => {
		try {
			setLoading(true);
			const response = await axios.get(
				`${ENDPOINT}/post/comment/${commentId}/add_like`,
				{
					headers: {
						Authorization: `Bearer ${
							window.localStorage.token &&
							JSON.parse(window.localStorage.token)
						}`,
					},
				}
			);
			setMessage({ message: response.data.message, variant: "success" });
			const commentData = await axios.get(
				`${ENDPOINT}/post/comment/${commentId}`
			);
			postDispatch({
				type: "UPDATE_COMMENT",
				payload: commentData.data.comment,
			});
			
		} catch (err) {
			setLoading(false);
			console.log(err);
			if (err) {
				if (err.response.data.general) {
					setMessage({
						message: err.response.data.general,
						variant: "danger",
					});
				}
				if (err.response.data.error) {
					setMessage({
						message: err.response.data.error,
						variant: "danger",
					});
				}
			}
		}
		setLoading(false);
	};
	const commentsData = () => {
		return postState.comments.filter(
			(comment) => comment.post.id === post.id
		);
	};
	const openCommentModal = (e) => {
		e.preventDefault();
		setShowModal(true);
		setLoading(true);
		axios
			.get(`${ENDPOINT}/post/${post.id}/comment`)
			.then((response) => {
				setLoading(false);
				postDispatch({
					type: "LOAD_POST_COMMENTS",
					payload: response.data.comments,
				});
			})
			.catch((err) => {
				console.log(err);
			});

			setLoading(false);
	};
	const submitComment = async (event) => {
		event.preventDefault();
		setLoading(true);
		try {
			
			const data = {
				body: text,
			};
			const response = await axios.post(
				`${ENDPOINT}/post/${post.id}/comment`,
				data,
				{
					headers: {
						Authorization: `Bearer ${
							window.localStorage.token &&
							JSON.parse(window.localStorage.token)
						}`,
					},
				}
			);

			const commentData = await axios.get(
				`${ENDPOINT}/post/comment/${response.data.commentId}`
			);
			postDispatch({
				type: "ADD_COMMENT",
				payload: commentData.data.comment,
			});
			const postData = await axios.get(`${ENDPOINT}/post/${post.id}`);
			postDispatch({ type: "UPDATE_POST", payload: postData.data.post });
			setMessage({ message: response.data.message, variant: "success" });
			setText("");
		} catch (err) {
			console.log(err);
			if (err) {
				if(err.response.status===500){
					setMessage({message:"some problem occur it may maintained within hour",variant:"warning"})
				}
				if(err.response.status===422){
				setMessage({message:err.response.data.error,variant:"warning"})

				}
				if (err.response.data.general) {
					setMessage({
						message: err.response.data.general,
						variant: "danger",
					});
				}
				if (err.response.data.error) {
					setMessage({
						message: err.response.data.error,
						variant: "danger",
					});
				}
			}
		}
		setLoading(false);
	};
	return (
		<React.Fragment>
			<Button
				onClick={openCommentModal}
				variant="info"
				className="mx-2"
				size="sm"
			>
				<span className="material-icons">feedback</span>
				<Badge variant="light">{post.comments}</Badge>
			</Button>

			<Modal
				centered
				size="lg"
				show={showModal}
				onHide={() => setShowModal(false)}
			>
				<Modal.Header closeButton>
					<Modal.Title>User Comments</Modal.Title>
				</Modal.Header>
				<Modal.Body>
				{loading ? <div style={{display:"flex",flex:1,flexDirection:"row",justifyContent:"center",alignItem:"center"}}><Spinner as="span" animation="border" role="status" aria-hidden="true" /></div> : null}

					{message ? (
						<Alert
							dismissible
							onClose={() => setMessage(null)}
							variant={message.variant}
						>
							{message.message}
						</Alert>
					) : null}

					<div
						className="my-3"
						style={{ overflow: "scroll", height: 350 }}
					>
						<Container>
							{commentsData().length ? (
								commentsData().map((comment) => (
									<Card key={comment.id} className="my-3">
										<Card.Body>
											<div
												style={{
													flex: 1,
													flexDirection: "row",
													justifyContent:
														"flex-start",
													alignItem: "center",
												}}
											>
												<span>
													{comment.user
														.profile_pic && (
														<Image
															style={{
																borderRadius:
																	"100%",
																width: 40,
																height: 40,
															}}
															src={
																comment.user
																	.profile_pic
															}
														/>
													)}
												</span>

												<span className="mx-2">
													<h6>{comment.user.name}</h6>
												</span>
											</div>
											<small className="my-2">
												{comment.body}
											</small>
											<div className="my-2 text-left">
												<span className="mx-2">
													<Badge
														style={{
															cursor: "pointer",
														}}
														onClick={() =>
															LikeComment(
																comment.id
															)
														}
														variant="info"
													>
														{comment.likes} likes
													</Badge>
												</span>
												<span className="mx-2">
													<Badge
														style={{
															cursor: "pointer",
														}}
														onClick={() =>
															setShowReply(
																"block"
															)
														}
														variant="success"
													>
														{comment.reply} reply
													</Badge>{" "}
												</span>
												{userState.currentUser &&
													userState.currentUser.id ===
														comment.user.id && (
														<span className="mx-2">
															<Badge
																style={{
																	cursor:
																		"pointer",
																}}
																onClick={(e) =>
																	deleteComment(
																		e,
																		comment
																			.post
																			.id,
																		comment.id
																	)
																}
																variant="danger"
															>
																delete
															</Badge>{" "}
														</span>
													)}
												<div
													style={{
														display: showReply,
													}}
												>
													<ReplyComment
														comment={comment}
														setLoading={setLoading}
														setMessage={setMessage}
													/>
													<Button
														className="my-2"
														size="sm"
														onClick={() =>
															setShowReply("none")
														}
														variant="light"
													>
														hide
													</Button>
												</div>
											</div>
										</Card.Body>
									</Card>
								))
							) : (
								<div
									style={{
										flex: 1,
										flexDirection: "column",
										justifyContent: "center",
										alignItem: "center",
									}}
								>
									<img
										src={commentImage}
										width="60%"
										height="20%"
									/>
									<div className="text-center">
										<h3>Start Commenting on user post</h3>
									</div>
								</div>
							)}
						</Container>
					</div>

					<div className="my-3 w-100 border shadow">
						<Row>
							<Container>
								<Col xs="12" sm={12} md={12} className="my-3">
									<Form>
										<Form.Group>
											<Form.Control
												value={text}
												placeholder="Enter your comments..."
												onChange={(e) =>
													setText(e.target.value)
												}
												as="textarea"
											/>
										</Form.Group>
										<Button
											onClick={submitComment}
											disabled={loading}
										>
										Comment
										</Button>
									</Form>
								</Col>
							</Container>
						</Row>
					</div>
				</Modal.Body>
			</Modal>
		</React.Fragment>
	);
};

export default Comments;
