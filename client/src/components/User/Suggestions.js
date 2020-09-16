import React from "react";
import {Link} from "react-router-dom"
import { Row, Col, Image, Button, Spinner } from "react-bootstrap";
import { UserContext, LoadingContext } from "../../App";
import FollowUnfollow from "./FollowUnfollow";
const Suggestions = ({ limit,show_profile }) => {
	const { userState } = React.useContext(UserContext);
	const { loadingState } = React.useContext(LoadingContext);
	return (
		<div
			className="bg-white shadow"
			style={{
				display: "flex",
				flexDirection: "column",
				flex: 1,
				flexWrap: "nowrap",
				justifyContent: "space-between",
				alignItems: "stretch",
			}}
		>
			{userState.users.length > 0
				? userState.users
						.slice(0, limit)
						.map((user) => (
							<React.Fragment key={user.id}>
								<div
									className="border-bottom"
									style={{
										display: "flex",
										flexDirection: "row",
										flex: 1,
										flexWrap: "nowrap",
										justifyContent: "space-between",
										alignItems: "center",
										padding: 10,

									}}
								>
								<div style={{
										display: "flex",
										flexDirection: "row",
										flex: 1,
										flexWrap: "wrap",
										justifyContent: "flex-start",
										alignItems: "center",
										
									}}>
									<div>
										{user.profile_pic && (
											<Image
												thumbnail
												style={{
													width: 60,
													height: 60,
													borderRadius: "100%",
												}}
												src={user.profile_pic}
											/>
										)}
									</div>

									<div>
										<div>{user.name}</div>
										<div className="text-muted">
											<small>{user.email}</small>
										</div>
									</div>
									</div>
									<div style={{
										display: "flex",
										flexDirection: "row",
										flex: 1,
										flexWrap: "wrap",
										justifyContent: "flex-end",
										alignItems: "center",

										
									}}>
								
									{userState.currentUser && userState.currentUser.id !== user.id && <div className="mx-2">
										<FollowUnfollow user={user} />
									</div>
								}
									{show_profile == "show" && <div><Button size="sm" variant="primary" as={Link} to={`/profile/${user.id}`}>profile</Button></div>}
									
								</div>
								</div>
							</React.Fragment>
						))
				: null}
		</div>
	);
};

export default Suggestions;
