import React, { useContext } from "react";
import { Row, Col, Container, Image, Button, Badge } from "react-bootstrap";
import { UserContext } from "../../App";
import axios from "axios";
import FollowUnfollow from "./FollowUnfollow";
import EditProfile from "./EditProfile";
import UserFollowersList from "./UserFollowersList";



const ProfileCard = ({ user, posts }) => {
	const { userState, userDispatch } = useContext(UserContext);

	const followCurrentUser = () => {
		let follow = false;
		user.followingsData.map((u) => {
			if (u.id === userState.currentUser.id) {
				follow = true;
			}
		});
		return follow;
	};
	const followByCurrentUser = () => {
		let follow = false;
		user.followersData.map((u) => {
			if (u.id === userState.currentUser.id) {
				follow = true;
			}
		});
		return follow;
	};

	return (
		<Container>
			<div
			className="border shadow bg-white"
				style={{
					display: "flex",
					flexDirection: "column",
					flex: 1,
					flexWrap: "wrap",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				{user && (
					<>
						<div
							className="my-3"
							style={{
								display: "flex",
								flexDirection: "row",
								flex: 0.4,
								flexWrap: "wrap",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							{user.profile_pic && (
								<Image

									style={{
										
										borderRadius: "100%",
										border:"4px solid tomato",
										width: 200,
										height: 200,
									}}
									thumbnail
									src={user.profile_pic}
								/>
							)}
						</div>

						<div
						className="my-4"
							style={{
								display: "flex",
								flexDirection: "column",
								flex: 0.6,
								flexWrap: "wrap",
								justifyContent: "space-between",
								alignItems: "space-between",
								paddingLeft: 10,
							}}
						>
							<div>
								<h3>{user.name}</h3>
							</div>
							<div>{user.email}</div>
							<div className="mb-3">
								<FollowUnfollow user={user} />
							</div>

							<div className="d-flex">
								<div>
									<Badge variant="light">
										Posts
										<Badge variant="warning" className="mx-3">
											{posts.length}
										</Badge>
									</Badge>
								</div>
								<div className="mx-3">
									<Badge variant="light">
										Bookmarks
										<Badge variant="warning" className="mx-3">
											{user.bookmarks}
										</Badge>
									</Badge>
								</div>
							</div>
							<div className="d-flex">
								<div>
									{followCurrentUser() && (
										<div>
											<Badge variant="warning">
												follow you
											</Badge>
										</div>
									)}
								</div>

								<div className="mx-3">
									{followByCurrentUser() && (
										<Badge variant="warning">
											follow by you
										</Badge>
									)}
								</div>
							</div>

							<div>
								<span>
									<UserFollowersList user={user} option="followers" />
								</span>

								<span className="mx-3">
									<span>
									<UserFollowersList user={user} option="followings" />
								</span>

								</span>
							</div>
							<div className="my-3">
								<div>
									{userState.currentUser &&
										user.id ===
											userState.currentUser.id && (
											<EditProfile />
										)}
								</div>

						
							</div>
						</div>
					</>
				)}
			</div>
		</Container>
	);
};

export default ProfileCard;
