import React, { useContext, useState } from "react";
import { Link} from "react-router-dom";
import DeletePost from "./DeletePost"
import {
	Row,
	Col,
	Button,
	Modal,
	Carousel} from "react-bootstrap";
import no_post from "../../image/no_post1.jpg";
import { PostContext, UserContext,LoadingContext } from "../../App";


const UserPosts = ({ user, posts }) => {
	const { userState } = useContext(UserContext);

	

	const [showGallary, setShowGallary] = useState(false);

	
	return (
		<div className="p-4">

			<Row>
				{posts.length > 0 ? (
					posts.map((post) => (
						<Col
							xs={6}
							md={3}
							sm={4}
							width="200px"
							height="200px"
							className="my-2 text-center"
						>
							{post.body.image && (
								<div onClick={() => setShowGallary(true)}>
									<img
										
										key={post.id}
										src={post.body.image}
										style={{width:"150px",height:"150px",borderRadius:"20px"}}
									/>
								</div>
							)}
						</Col>
					))
				) : (
					<div
						className="bg-white p-4"
						style={{
							display: "flex",
							flex: 1,
							flexDirection: "column",
							justifyContent: "flex-start",
							alignItems: "center",
						}}
					>
						<div>
							<img src={no_post} width="100%" height="100px" />
						</div>
						<div>
							<h3 className="text-center">
								start interact with community{" "}
							</h3>
						</div>
						<div>
							<Button as={Link} to="/post/create">
								Share Photos
							</Button>
						</div>
					</div>
				)}
			</Row>

			<Modal
				show={showGallary}
				onHide={() => setShowGallary(false)}
				size="lg"
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Body>
					<Carousel>
						{posts.length > 0 &&
							posts
								.filter((post) => post.body.image)
								.map((post) => (
									<Carousel.Item>
										<img
											className="d-block w-100"
											src={post.body.image}
											alt={post.id}
											width="100%"
											height="400px"
										/>
										{post.user.id === userState.currentUser.id && <Carousel.Caption>
											<DeletePost postId={post.id} />
										</Carousel.Caption>}
									</Carousel.Item>
								))}
					</Carousel>
				</Modal.Body>
			</Modal>
		</div>
	);
};

export default UserPosts;
