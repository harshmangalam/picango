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
import { UserContext, PostContext } from "../../App";
import { getUserPost } from "../../utils/posts";
const Profiles = () => {
	const { userState } = useContext(UserContext);
	const { postState } = useContext(PostContext);

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "row",
				flex: 1,
				flexWrap: "wrap",
				justifyContent: "space-between",
				alignItems: "center",
				padding:10
			}}
			className="bg-white shadow"
		>
			{userState.currentUser ? (
				<>
					<div>
						{userState.currentUser.profile_pic && (
							<Image
								style={{
									width: 100,
									height: 100,
									borderRadius: "100%",
								}}
								thumbnail
								src={userState.currentUser.profile_pic}
							/>
						)}
					</div>

					<div
						style={{
							display: "flex",
							flexDirection: "column",
							flex: 1,
							flexWrap: "wrap",
							justifyContent: "space-between",
							alignItems: "stretch",
							paddingLeft:10
						}}
					>
						<div className="">{userState.currentUser.name}</div>
						<div className="text-muted">
							<small>{userState.currentUser.email}</small>
						</div>

						<div style={{
							display: "flex",
							flexDirection: "row",
							flex: 1,
							flexWrap: "wrap",
							justifyContent: "space-between",
							alignItems: "stretch",

							
						}}>
							<Badge className="mt-2" variant="light">
								Followers
								<Badge variant="warning" className="mx-2">
									{userState.currentUser.followers}
								</Badge>
							</Badge>
							<Badge className="mt-2" variant="light">
								Followings
								<Badge variant="primary" className="mx-2">
									{userState.currentUser.followings}
								</Badge>
							</Badge>
							<Badge variant="light" className="mt-2">
								Posts
								<Badge variant="danger" className="mx-2">
									{
										getUserPost(
											userState.currentUser.id,
											postState
										).length
									}
								</Badge>
							</Badge>
						</div>
					</div>
				</>
			) : null}
		</div>
	);
};

export default Profiles;
