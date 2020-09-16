import React from "react";
import {Row,Col,Container,Image,Button,Tabs,Tab} from "react-bootstrap"
import post_img from "../../image/no_post.jpg"
const UserBookmarks = ({post}) => {
	
	return (
		<div className="bg-white text-center text-success">
				<img src={post_img} width="100%" height="200px"/>
				Features comming Soon
		</div>
	);
};

export default UserBookmarks;
