import React from "react";
import { Badge, OverlayTrigger, Popover } from "react-bootstrap";

const UserFollowersList = ({ user }) => {
	const overlay = (
		<Popover id="popover-basic">
			<Popover.Title as="h3">likes {user.length}</Popover.Title>
			<Popover.Content>
				<div
					style={{
						flex: 1,
						flexWrap: "nowrap",
						flexDirection: "column",
						justifyContent: "space-between",
						alignItem: "center",
					}}
				>
						{user.map((usr) => (
								<div
									className="border-bottom my-2"
									style={{ flexDirection: "row" }}
								>
									<div>
										{usr.profile_pic && (
											<img
												src={usr.profile_pic}
												width="40px"
												height="40px"
												style={{ borderRadius: "100%" }}
											/>
										)}
									</div>
									<div>{usr.name}</div>
								</div>
						))}	
					</div>
			</Popover.Content>
		</Popover>
	);
	return (
		<>
			<OverlayTrigger
				trigger="click"
				placement="right"
				overlay={overlay}
			>
				<Badge variant="light" style={{ cursor: "pointer" }}>
					likes 
					<Badge variant="success" className="mx-1">
						({user.length})
					</Badge>
				</Badge>
			</OverlayTrigger>
		</>
	);
};

export default UserFollowersList;
