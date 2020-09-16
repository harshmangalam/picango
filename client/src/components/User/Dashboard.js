import React from "react";
import {Row,Col,Container,Image,Button,Tabs,Tab} from "react-bootstrap"
import UserPosts from "../Post/UserPosts"
import UserBookmarks from "../Post/UserBookmarks"

const Dashboard = ({user,posts}) => {
	return (
		<div>
			<Row>
				<Col>
					<Container>
						<Tabs defaultActiveKey="posts">

							<Tab eventKey="posts" title="Posts">
							<div className="bg-white shadow "><UserPosts user={user} posts={posts} /></div>
							</Tab>
							<Tab eventKey="bookmarks" title="Bookmarks">
							<UserBookmarks user={user} posts={posts} />
							</Tab>
						</Tabs>
					</Container>
				</Col>
			</Row>
		</div>
	);
};

export default Dashboard;
