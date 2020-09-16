import React, { useRef, useState, useEffect } from "react";
import { Button, Overlay, Popover,ListGroup } from "react-bootstrap";
import {Link} from "react-router-dom"

const NavUserProfile = ({userState}) => {
	const [show, setShow] = useState(false);
	const [target, setTarget] = useState(null);
	const ref = useRef(null);

	const handleShowNotification = (event) => {
		setShow(!show);
		setTarget(event.target);
	};

	return (
		<div ref={ref}>
			<div className="">
				<img
					onClick={handleShowNotification}
					width="45px"
					height="45px"
					style={{ borderRadius: "100%", border: "3px solid white" }}
					src={
						userState.currentUser && userState.currentUser.profile_pic
					}
				/>
			</div>

			<Overlay
				show={show}
				target={target}
				placement="bottom"
				container={ref.current}
				containerPadding={20}
			>
				<Popover id="popover-contained">
					<Popover.Title as="h3" className="text-center text-dark">{userState.currentUser.name}</Popover.Title>
					<Popover.Content>
						<ListGroup variant="flush">
						  <ListGroup.Item>
						  	<Button as={Link} onClick={()=>setShow(false)} className="btn-block" variant="light" to={`/profile/${userState.currentUser.id}`}>view profile </Button>
						  </ListGroup.Item>

						  <ListGroup.Item>
						  	<Button as={Link}  onClick={()=>setShow(false)} className="btn-block" variant="light" to={`/settings`}>settings </Button>
						  </ListGroup.Item>
						  
						</ListGroup>
						</Popover.Content>
				</Popover>
			</Overlay>
		</div>
	);
};

export default NavUserProfile;
