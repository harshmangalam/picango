import React from "react";
import {Link} from "react-router-dom"
import { Row, Col, Image, Button, Spinner,Container } from "react-bootstrap";
import FollowUnfollow from "../components/User/FollowUnfollow";
import Suggestions from "../components/User/Suggestions"
const UserList = () => {

	return (
	<div>
	<Row>
	<Col xs={12} sm={{span:12}} md={{span:8,offset:2}}>
		<Suggestions limit={10} show_profile="show" />
		</Col>
		</Row>
	</div>	
	);
}

export default UserList;
