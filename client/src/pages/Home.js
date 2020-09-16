import React, { useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Row, Col, Spinner, Button } from "react-bootstrap";
import Posts from "../components/Post/Posts";
import Profiles from "../components/User/Profiles";
import Suggestions from "../components/User/Suggestions";

import { UserContext, LoadingContext, PostContext } from "../App";
import no_post from "../image/no_post1.jpg";
import register from "../image/register.jpg";

const Home = () => {
	const { userState } = useContext(UserContext);
	const { loadingState } = useContext(LoadingContext);
	const { postState } = useContext(PostContext);

	return (
		<div>
			<Row>
				<Col xs={12} sm={12} md={8}>
					{postState.posts.length ? (
						<Posts />
					) : (
						<div
							style={{
								display: "flex",
								flex: 1,
								flexDirection: "column",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<div>
								<img
									src={no_post}
									width="100%"
									height="200px"
								/>
							</div>

							<div>
								<h4 className="text-center">
									Start Sharing Image Posts To yor Connected
									Community and Followers
								</h4>
							</div>
							<div>
								<Button
									className=""
									variant="warning"
									as={Link}
									to="/post/create"
								>
									Share Image Now
								</Button>
							</div>
						</div>
					)}
				</Col>

				<Col xs={12} sm={12} md={4}>
					{userState.currentUser ?
						(
							<div style={{ position: "fixed" }}>
						<div className="d-sm-none d-lg-block my-3">
							<div className="border">
								<Profiles />
							</div>

							<div>
								<div className="my-3 border">
									<Suggestions limit={2} show_profile="" />
								</div>
							</div>
						</div>
						</div>

						) : (

							<div
							style={{
								display: "flex",
								flexDirection: "column",
								flex: 1,
								flexWrap: "wrap",
								justifyContent: "center",
								alignItems: "center",
								
							}}
							className="text-center bg-white border my-3"
						>
							<div style={{paddingTop:30,paddingBottom:30}}>
								<h4 className="">Login Your Account</h4>
								<Button
									className="btn-block"
									as={Link}
									to="/login"
								>
									Login
								</Button>
							</div>
						</div>

						)
					}
					
				</Col>
			</Row>
		</div>
	);
};

export default Home;
