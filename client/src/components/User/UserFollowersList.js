import React from "react";
import { Badge ,OverlayTrigger,Popover} from "react-bootstrap";

const UserFollowersList = ({ user,option }) => {

	const overlay = (
			<Popover id="popover-basic">
						<Popover.Title as="h3">{option}</Popover.Title>
						<Popover.Content>
							<div style={{flex:1,flexWrap: "nowrap",flexDirection:"column",justifyContent:"space-between",alignItem:"center"}}>

							{option==="followers" && user && (
								<>
									{user.followersData.map(usr=>(

										<>
											<div className="border-bottom my-2" style={{flexDirection:"row",flexWrap: "nowrap",justifyContent:"center",alignItem:"center"}}>
												<div>{usr.profile_pic && <img src={usr.profile_pic} width="40px" height="40px" style={{borderRadius:"100%"}} />}</div>
												<div>{usr.name}</div>
											</div>
										</>
										))}
								</>
								)}
								{option==="followings" && user && (
								<>
									{user.followingsData.map(usr=>(

										<>
											<div className="border-bottom my-2" style={{flexDirection:"row"}}>
												<div>{usr.profile_pic && <img src={usr.profile_pic} width="40px" height="40px" style={{borderRadius:"100%"}} />}</div>
												<div>{usr.name}</div>
											</div>
										</>
										))}
								</>
								)}
							{option==="followings"}
							</div>
						</Popover.Content>
					</Popover>
		)
	return (
		<>
			<OverlayTrigger
				trigger="click"
				placement={option==="followers" ? "right" : "left"}
				overlay={overlay}
			>
				<Badge variant="light" style={{cursor:"pointer"}}>
					{option==="followers"?"Followers":"Followings"}
					<Badge variant="success" className="mx-3">
						{option==="followers" && user && user.followers}
						{option==="followings" && user && user.followings}

					</Badge>
				</Badge>
			</OverlayTrigger>
		</>
	);
};

export default UserFollowersList;
